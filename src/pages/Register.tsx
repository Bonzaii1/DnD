import Button from "@/components/ui/Button"
import { useAuth } from "@/hooks/useAuth"
import { useEventSeries } from "@/hooks/useEventSeries"
import { useCertificationType } from "@/hooks/useCertifications"
import { useState, useEffect } from "react"
import { api } from "@/services/api"
import { useNavigate } from "react-router-dom"
import { registrationService } from "@/services/registration"
import { ACTIVE_EVENT_ID, CURRENT_YEAR, isDrillCertification, isDrumCertification } from "@/constants"
import ErrorMessage from "@/components/ui/ErrorMessage"

const inputClass = "w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:opacity-60"




export default function Register() {
  const [page, setPage] = useState(1)
  const [bootCampGuideVerify, setBootCampGuideVerify] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  //const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true)
  const {eventSeries } = useEventSeries()
  const {certifications } = useCertificationType()
  const {user} = useAuth()

  const [isRegisteredFlag, setIsRegisteredFlag] = useState(false)

  useEffect(() => {
    async function checkRegistration() {
      if (user) {
        const registered = await registrationService.checkIsRegistered(user.id)
        setIsRegisteredFlag(registered)
      }
    }
    checkRegistration()
  }, [user])

  // Page 2 form values
  
  const [pastEvents, setPastEvents] = useState<number[]>([])
  const [certificationOption, setCertificationOption] = useState("")
  
  // Page 3 drum equipment checkboxes (for certification types 14-17)
  const [drumEquipmentCheck, setDrumEquipmentCheck] = useState(false)
  const [drumRequirementCheck, setDrumRequirementCheck] = useState(false)
  
  // Registration status
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(){
    setIsSubmitting(true)
    setSuccessMessage("")
    setErrorMessage("")
    
    try {
      const response = await api.post('/api/db/register', {
        pastEvents,
        certificationOption,
        userId: user!.id,
        eventId: ACTIVE_EVENT_ID,
        year: CURRENT_YEAR
      })
      
      console.log('Registration successful:', response)
      setSuccessMessage("Registration successful! Your certification application has been submitted.")
      // Optionally reset form or redirect after a delay
      setTimeout(() => navigate('/progress'), 2000)
    } catch (error: any) {
      console.error('Registration failed:', error)
      setErrorMessage(error?.message || "Registration failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    //Form Object
    <section className="p-4 flex flex-col bg-white rounded-xl md:max-w-3xl  gap-4 md:p-8 md:border md:border-gray-300 justify-center mx-auto ">

      <form className="flex flex-col gap-5 md:p-4"> 

        {isRegisteredFlag && (
          <div className="flex flex-col gap-4 p-6 rounded-lg bg-blue-50 border-2 border-blue-200">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-blue-600 shrink mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-blue-900">Already Registered</h2>
                <p className="text-sm text-blue-800">
                  You are already registered! You do not need to register again.
                </p>
                <p className="text-sm text-blue-800">
                  Please check your email for further instructions or visit the Certification Progress page to track your application status.
                </p>
                <Button 
                  onClick={() => navigate('/progress')}
                  variant="primary"
                  className="mt-3 w-fit"
                >
                  Go to Certification Progress
                </Button>
              </div>
            </div>
          </div>
        )}

        { page === 1 && !isRegisteredFlag &&
          <>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-gray-900">Boot Camp Registration</h2>
              
              <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-700"><span className="font-semibold">Open to:</span> Pathfinder & Master Guide Ministries</p>
                <p className="text-sm text-gray-700"><span className="font-semibold">Date:</span> Thursday, September 10 - Sunday, September 13, 2026</p>
                <p className="text-sm text-gray-700"><span className="font-semibold">Location:</span> Lake Whitney Ranch, Farm to Market 2841, Clifton, TX 76634</p>
              </div>

              <div className="flex flex-col gap-3 border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-900">Drill Bootcamp</h3>
                <p className="text-sm text-gray-700"><span className="font-semibold">Eligibility:</span> Participants must be high school age and up.</p>
                <p className="text-sm text-gray-700"><span className="font-semibold">Available Tracks:</span> Drill Master, Color Guard, and Drill Leadership</p>
                <p className="text-sm text-gray-700"><span className="font-semibold">Accommodations:</span> Camping only</p>
              </div>

              <div className="flex flex-col gap-3 border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-900">Drum Corps Bootcamp</h3>
                <p className="text-sm text-gray-700"><span className="font-semibold">Eligibility:</span> Ages 10+</p>
                <p className="text-sm text-gray-700"><span className="font-semibold">Available Tracks:</span> Drum: Beginner, Drum: Intermediate, Drum: Advanced, Texas Drum Corps (TXDC)</p>
                <p className="text-sm text-gray-700"><span className="font-semibold">Accommodations:</span> Camping Only</p>
              </div>

              <div className="flex flex-col gap-3 bg-yellow-50 border border-yellow-200 rounded-md p-3">
                <p className="text-sm font-semibold text-gray-900">Note:</p>
                <p className="text-sm text-gray-700">Drill Leadership and Texas Drum Corps are <span className="font-semibold">INVITE ONLY</span>. Applicants to drill leadership and TXDC who were not invited will be asked to resubmit their application.</p>
              </div>

              <div className="flex flex-col gap-3 border-t pt-4">
                <p className="text-sm font-semibold text-gray-900">Bootcamp participation requires:</p>
                <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1 ml-2">
                  <li>Website sign up</li>
                  <li>Certification Portfolio completion</li>
                  <li>Approval of your candidacy through email/website</li>
                  <li>Payment through YMMS</li>
                </ol>
                <p className="text-xs text-gray-600 italic">These steps must be complete in order.</p>
              </div>

              <div className="flex flex-col gap-3 border-t pt-4">
                <p className="text-sm text-gray-900">
                  To proceed, you <span className="font-semibold">MUST</span> have read the full informational document:{" "}
                  <a 
                    href="/path/to/TX-Youth-Bootcamp-Guide.pdf" 
                    download="TX-Youth-Bootcamp-Guide.pdf"
                    className="text-blue-600 hover:text-blue-800 underline font-medium"
                  >
                    TX Youth Bootcamp Guide
                  </a>
                </p>
                
                <label htmlFor="guide_certification" className="flex items-start gap-2 text-sm font-medium text-gray-900 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="guide_certification" 
                    id="guide_certification" 
                    checked={bootCampGuideVerify} 
                    onChange={(e) => {setIsButtonDisabled(!e.target.checked); setBootCampGuideVerify(e.target.checked)}}
                    className="mt-0.5 rounded border-gray-300"
                  />
                  <span>I certify that I have fully read and understood the TX Youth Bootcamp Guide</span>
                </label>
              </div>
            </div>
          </>
        }
        {
          page === 2 && !isRegisteredFlag && 
          <>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">What events have you participated in the past?</label>
              {eventSeries.map((option, index) => (
                <label key={index} className="flex items-center gap-2 text-sm text-gray-900">
                  <input 
                    type="checkbox" 
                    name="past_events" 
                    value={option.id}
                    checked={pastEvents.includes(option.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPastEvents([...pastEvents, option.id])
                      } else {
                        setPastEvents(pastEvents.filter(id => id !== option.id))
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                  {option.name}
                </label>
              ))}
            </div>

            <div className="flex flex-col gap-2"> 
            <label htmlFor="certification_option" className="text-sm font-medium text-gray-700">What certification are you signing up for?</label>
            <select 
              id="certification_option" 
              name="certification_option" 
              className={inputClass}
              value={certificationOption}
              onChange={(e) => setCertificationOption(e.target.value)}
            >
                <option value="">Select Option</option>
                {certifications.map((option, index) => (
                    <option key={index} value={option.id}>{option.name}</option>
                ))}
            </select>
            </div>  

          </>

        }
        {
          page === 3 && !isRegisteredFlag && 
          <>
            <div className="flex flex-col gap-4">
              {/* Drill Certifications */}
              {isDrillCertification(certificationOption) && (
                <>
                  <h2 className="text-xl font-semibold text-gray-900">Thank You!</h2>
                  <p className="text-sm text-gray-700">
                    Thank you for your interest in TX Youth Bootcamp 2026! Your next step is to complete your portfolio in the Certification Portfolio section. 
                    If you have any questions, please send an email to{" "}
                    <a href="mailto:txdrill@texaspathfinders.org" className="text-blue-600 hover:text-blue-800 underline">
                      txdrill@texaspathfinders.org
                    </a>
                    , or contact either your area coordinator or area drill coordinator.
                  </p>
                </>
              )}

              {/* Drum Certifications */}
              {isDrumCertification(certificationOption) && (
                <>
                  <h2 className="text-xl font-semibold text-gray-900">Thank You!</h2>
                  <p className="text-sm text-gray-700">
                    Thank you for your interest in TX Youth Bootcamp 2026! Your next step is to complete your portfolio in the Certification Portfolio section. 
                    If you have any questions, please send an email to{" "}
                    <a href="mailto:txdrill@texaspathfinders.org" className="text-blue-600 hover:text-blue-800 underline">
                      txdrill@texaspathfinders.org
                    </a>
                    , or contact your area coordinator.
                  </p>

                  <div className="flex flex-col gap-3 border-t pt-4">
                    <p className="text-sm font-semibold text-gray-900">Please note the following are required for participation:</p>
                    
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-2 ml-2">
                      <li>
                        Vic Firth Corpsmaster Signature Snare sticks -{" "}
                        <a 
                          href="https://www.amazon.com/Vic-Firth-Corpsmaster-Signature-SRH/dp/B072DWSFR9?ref_=ast_sto_dp&th=1" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline break-all"
                        >
                          View on Amazon
                        </a>
                      </li>
                      <li>
                        Drum Pad option A: cheaper. The accompanying sticks do NOT qualify for bootcamp -{" "}
                        <a 
                          href="https://www.amazon.com/Donner-Inches-Practice-Sticks-Blue/dp/B07W5P7SCZ/ref=sr_1_9?crid=1NV5KO6XU3T63&dib=eyJ2IjoiMSJ9.TKdcQ-He" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline break-all"
                        >
                          View on Amazon
                        </a>
                      </li>
                      <li>
                        Drum Pad option B: Better long term option, more expensive -{" "}
                        <a 
                          href="http://amazon.com/Evans-RealFeel-2-Sided-Practice-Pad/dp/B000FMDIXY/ref=sr_1_4?crid=1NV5KO6XU3T63&dib=eyJ2IjoiMSJ9.TKdcQ-Hev8cgyYFa14" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline break-all"
                        >
                          View on Amazon
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col gap-2 bg-yellow-50 border border-yellow-200 rounded-md p-3">
                    <p className="text-sm font-semibold text-gray-900">Important:</p>
                    <p className="text-sm text-gray-700">Drums are required for intermediate, advanced, and TXDC. Drums are optional for beginner level if you have them.</p>
                    <p className="text-sm font-semibold text-red-600">Drums will NOT be provided to anyone at any level.</p>
                  </div>

                  <div className="flex flex-col gap-3 border-t pt-4">
                    <label htmlFor="drum_equipment_check" className="flex items-start gap-2 text-sm font-medium text-gray-900 cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="drum_equipment_check" 
                        id="drum_equipment_check" 
                        checked={drumEquipmentCheck}
                        onChange={(e) => setDrumEquipmentCheck(e.target.checked)}
                        className="mt-0.5 rounded border-gray-300"
                      />
                      <span>I understand I am required to bring the sticks and drum pad linked above. I understand purchasing drum pad option A still requires me to buy the Vic Firth Corpsmaster Signature Snare sticks.</span>
                    </label>

                    <label htmlFor="drum_requirement_check" className="flex items-start gap-2 text-sm font-medium text-gray-900 cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="drum_requirement_check" 
                        id="drum_requirement_check" 
                        checked={drumRequirementCheck}
                        onChange={(e) => setDrumRequirementCheck(e.target.checked)}
                        className="mt-0.5 rounded border-gray-300"
                      />
                      <span>I understand, if I want to be in the intermediate, advanced, or TXDC level, I need to provide my own drum.</span>
                    </label>
                  </div>
                </>
              )}

              {/* Show message if no certification selected */}
              {!certificationOption && (
                <p className="text-sm text-gray-600 italic">Please select a certification option on the previous page to continue.</p>
              )}
            </div>
          </>

        }

      </form>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="p-4 rounded-md bg-green-50 border border-green-200">
          <p className="text-sm text-green-800">{successMessage}</p>
        </div>
      )}
      
      <ErrorMessage error={errorMessage} size="md" className="mb-4" />

      {!isRegisteredFlag && (
      <div className="flex gap-3">
        <Button 
      onClick={() => {
        if (page > 1) {
          setPage(page - 1)
          setSuccessMessage("")
          setErrorMessage("")
        }
      }}
      variant="secondary"
      className='w-full shadow-sm hover:shadow-md transition-all duration-200 py-3'
    >
      Previous
    </Button>

    {
      page === 3 ?
      <Button 
      onClick={handleSubmit}
      variant="primary"
      className='w-full shadow-sm hover:shadow-md transition-all duration-200 py-3'
      disabled={
        !certificationOption ||
        (isDrumCertification(certificationOption) && (!drumEquipmentCheck || !drumRequirementCheck)) ||
        isSubmitting
      }
    >
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </Button>
    :
    <Button 
      onClick={() => {
        if (page < 3) {
          setPage(page + 1)
          setSuccessMessage("")
          setErrorMessage("")
        }
      }}
      variant="primary"
      className='w-full shadow-sm hover:shadow-md transition-all duration-200 py-3'
      disabled={
        (page === 1 && isButtonDisabled) ||
        (page === 2 && !certificationOption)
      }
    >
      Next
    </Button>

    }
      </div>
      )}




    </section>
  )
}
