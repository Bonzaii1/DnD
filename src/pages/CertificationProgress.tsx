import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"
import { api } from "@/services/api"
import Navbar from "@/components/ui/Navbar"
import Button from "@/components/ui/Button"

type CertificationRequirement = {
  id: number
  name: string
  description: string
  required: boolean
  sort_order: number
}

type UserRequirementStatus = {
  id: number
  certificationRequirementId: number
  status: 'not_started' | 'in_progress' | 'submitted' | 'approved' | 'rejected'
  submitted_at: string | null
  approved_at: string | null
  approved_by: number | null
  notes: string | null
  file_url: string | null
  requirement: CertificationRequirement
}

type UserCertification = {
  id: number
  certificationTypeId: number
  certificationTypeName: string
  eventId: number | null
  eventName: string | null
  status: string
  started_at: string
  completed_at: string | null
  verified_at: string | null
  requirements: UserRequirementStatus[]
}

export default function CertificationProgress() {
  const { user } = useAuth()
  const [certifications, setCertifications] = useState<UserCertification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [expandedCert, setExpandedCert] = useState<number | null>(null)

  useEffect(() => {
    if (user?.id) {
      fetchCertificationProgress()
    }
  }, [user])

  async function fetchCertificationProgress() {
    try {
      setLoading(true)
      const response = await api.get<UserCertification[]>(`/api/db/certifications/progress/${user!.id}`)
      setCertifications(response)
    } catch (err: any) {
      setError(err?.message || "Failed to load certification progress")
    } finally {
      setLoading(false)
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'submitted':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case 'approved':
        return '✓'
      case 'submitted':
        return '⏳'
      case 'in_progress':
        return '📝'
      case 'rejected':
        return '✗'
      default:
        return '○'
    }
  }

  function calculateProgress(requirements: UserRequirementStatus[]) {
    if (requirements.length === 0) return 0
    const completed = requirements.filter(r => r.status === 'approved').length
    return Math.round((completed / requirements.length) * 100)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f8ff] text-gray-900 antialiased">

      <section className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Certifications</h1>
          <p className="text-gray-600 mt-2">Track your progress through certification requirements</p>
        </div>

        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading your certifications...</p>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-md bg-red-50 border border-red-200 mb-6">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {!loading && !error && certifications.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500 mb-4">You haven't registered for any certifications yet.</p>
            <Button variant="primary" onClick={() => window.location.href = '/register'}>
              Register for Certification
            </Button>
          </div>
        )}

        {!loading && !error && certifications.length > 0 && (
          <div className="space-y-4">
            {certifications.map((cert) => {
              const progress = calculateProgress(cert.requirements)
              const isExpanded = expandedCert === cert.id

              return (
                <div key={cert.id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  {/* Certification Header */}
                  <div 
                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedCert(isExpanded ? null : cert.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-xl font-semibold text-gray-900">
                            {cert.certificationTypeName}
                          </h2>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(cert.status)}`}>
                            {cert.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        
                        {cert.eventName && (
                          <p className="text-sm text-gray-600 mb-3">
                            Event: {cert.eventName}
                          </p>
                        )}

                        {/* Progress Bar */}
                        <div className="mb-2">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span className="font-medium">{progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>

                        <p className="text-xs text-gray-500">
                          Started: {new Date(cert.started_at).toLocaleDateString()}
                          {cert.completed_at && ` • Completed: ${new Date(cert.completed_at).toLocaleDateString()}`}
                          {cert.verified_at && ` • Verified: ${new Date(cert.verified_at).toLocaleDateString()}`}
                        </p>
                      </div>

                      <button className="ml-4 text-gray-400 hover:text-gray-600">
                        <svg 
                          className={`w-6 h-6 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Requirements List */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 bg-gray-50 p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Requirements</h3>
                      
                      {cert.requirements.length === 0 ? (
                        <p className="text-gray-500 text-sm">No requirements defined for this certification yet.</p>
                      ) : (
                        <div className="space-y-3">
                          {cert.requirements.map((req) => (
                            <div 
                              key={req.id} 
                              className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow"
                            >
                              <div className="flex items-start gap-3">
                                <span className="text-2xl mt-1">{getStatusIcon(req.status)}</span>
                                
                                <div className="flex-1">
                                  <div className="flex items-start justify-between mb-1">
                                    <h4 className="font-medium text-gray-900">
                                      {req.requirement.name}
                                      {req.requirement.required && (
                                        <span className="text-red-500 ml-1">*</span>
                                      )}
                                    </h4>
                                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(req.status)}`}>
                                      {req.status.replace('_', ' ')}
                                    </span>
                                  </div>
                                  
                                  {req.requirement.description && (
                                    <p className="text-sm text-gray-600 mb-2">
                                      {req.requirement.description}
                                    </p>
                                  )}

                                  {req.notes && (
                                    <p className="text-sm text-gray-700 italic mb-2">
                                      Note: {req.notes}
                                    </p>
                                  )}

                                  <div className="flex items-center gap-4 text-xs text-gray-500">
                                    {req.submitted_at && (
                                      <span>Submitted: {new Date(req.submitted_at).toLocaleDateString()}</span>
                                    )}
                                    {req.approved_at && (
                                      <span>Approved: {new Date(req.approved_at).toLocaleDateString()}</span>
                                    )}
                                    {req.file_url && (
                                      <a 
                                        href={req.file_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                      >
                                        View File
                                      </a>
                                    )}
                                  </div>

                                  {req.status === 'not_started' && (
                                    <Button 
                                      variant="primary" 
                                      className="mt-3 text-xs py-1 px-3"
                                      onClick={() => {/* TODO: Open upload modal */}}
                                    >
                                      Submit Requirement
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </section>
    
    </div>
  )
}
