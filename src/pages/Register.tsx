import Button from "@/components/ui/Button"
//import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useEventSeries } from "@/hooks/useEventSeries"
import { useCertificationType } from "@/hooks/useCertifications"
import { useState } from "react"
import { api } from "@/services/api"
//import { useRequirements } from "@/hooks/useRequirements"

const inputClass = "w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:opacity-60"




export default function Register() {
  const [page, setPage] = useState(1)
  const [bootCampGuideVerify, setBootCampGuideVerify] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true)
  const {eventSeries } = useEventSeries()
  const {certifications } = useCertificationType()
  const {user} = useAuth()
  
  // Page 2 form values
  
  const [pastEvents, setPastEvents] = useState<number[]>([])
  const [certificationOption, setCertificationOption] = useState("")
  
  // Registration status
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  // //const [selectedArea, setSelectedArea] = useState(0)
  // //const [selectedChurch, setSelectedChurch] = useState("")
  // const { loading, error, uploadResult, uploadPayload } = useDrive("1aPBBTgcfqSu0TutoAIp0tmwKe3ONg9SH")
  // const { areas, loading: areaLoading } = useArea()
  // const { churches, loading: churchLoading } = useChurch(null)
  // const { user } = useAuth()
  // const userChurch = churches.find(church => church.id === user!.churchId)
  // //const { resMessage, update } = useRequirements()



  // // async function handleAreaChange(e: React.ChangeEvent<HTMLSelectElement>) {
  // //   e.preventDefault()
  // //   const id = Number(e.target.value)
  // //   getByArea(id)
  // // }


  // async function handleFormSubmit(e: React.SyntheticEvent<HTMLFormElement>) {

  //   e.preventDefault()

  //   const data = new FormData(e.currentTarget)

  //   const fname = user!.fname
  //   const lname = user!.lname
  //   const areaId = user!.areaId
  //   const churchId = user!.churchId

  //   const area = areas.find(area => area.id === areaId)
  //   const church = churches.find(church => church.id === churchId)

  //   const recordCard = data.get('RecordCard') as File | null
  //   const entranceEssay = data.get('EntranceEssay') as File | null
  //   const notes = data.get('Notes') as File | null
  //   const recommendation = data.get('Recommendation') as File | null

  //   console.log(recordCard)

  //   console.log(notes)

  //   const payload = {
  //     "fname": fname,
  //     "lname": lname,
  //     "recordCard": recordCard,
  //     "entranceEssay": entranceEssay,
  //     "notes": notes,
  //     "recommendation": recommendation
  //   }
  //   {
  //     // const payloadRequirements = {
  //     //   "recordCard": recordCard?.name ? 1 : 0,
  //     //   "entranceEssay": entranceEssay?.name ? 1 : 0,
  //     //   "notes": notes?.name ? 1 : 0,
  //     //   "recommendation": recommendation?.name ? 1 : 0,
  //     //   "userId": 1
  //     // }

  //     await uploadPayload(payload, `Source Folder/${area?.name}/${church?.name} ${church?.cname}`)
  //     //await update(payloadRequirements)

  //   }
  // }


  async function handleSubmit(){
    setIsSubmitting(true)
    setSuccessMessage("")
    setErrorMessage("")
    
    try {
      const response = await api.post('/api/db/register', {
        pastEvents,
        certificationOption,
        userId: user!.id,
        eventId: 6
      })
      
      console.log('Registration successful:', response)
      setSuccessMessage("Registration successful! Your certification application has been submitted.")
      // Optionally reset form or redirect after a delay
      // setTimeout(() => navigate('/'), 2000)
    } catch (error: any) {
      console.error('Registration failed:', error)
      setErrorMessage(error?.message || "Registration failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    //Form Object
    <section className="p-4 flex flex-col bg-white rounded-xl md:max-w-md  gap-4 md:p-8 md:border md:border-gray-300 justify-center mx-auto ">

      <form className="flex flex-col gap-5 md:p-4"> 
        { page === 1 &&
          <>
            <h2 className="font-bold">Landing Page</h2>
            <div className="flex gap-2">
              <p>Leads to Sign up page with guide to bootcamp? the personal info one?</p>
            </div>

            <div className="flex flex-col gap-1">
                <p>Application flow, maybe an image?</p>
            </div>

            <div className="flex flex-col gap-1 items-start">
                <label htmlFor="fName" className="text-sm font-medium text-black">I certify that I have fully read and understood the TX Youth Bootcamp Guide</label>
                <input type="checkbox" name="guide_certification" id="guide_certification" checked={bootCampGuideVerify} onChange={(e) => {setIsButtonDisabled(!e.target.checked); setBootCampGuideVerify(e.target.checked)}} />
            </div>
          </>
        }
        {
          page === 2 && 
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
          page === 3 && 
          <>
            <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-gray-900">Attendance Requirements</h2>

            <h2 className = 'text-xl font-semibold text-gray-900'>Requirements here</h2>

            <div className="flex flex-col gap-1 items-start">
                <label htmlFor="fName" className="text-sm font-medium text-black">I certify that I have fully read and understood the TX Youth Bootcamp Guide</label>
                <input type="checkbox" name="requirements_check" id="requirements_check" onChange={(e) => {setIsSubmitButtonDisabled(!e.target.checked)}} />
            </div>
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
      
      {errorMessage && (
        <div className="p-4 rounded-md bg-red-50 border border-red-200">
          <p className="text-sm text-red-800">{errorMessage}</p>
        </div>
      )}

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
      disabled={isSubmitButtonDisabled || isSubmitting}
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
      disabled ={isButtonDisabled}
    >
      Next
    </Button>

    }
      </div>
      




    </section>
  )
}
