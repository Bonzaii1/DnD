import Button from "@/components/ui/Button"
//import { useState } from "react"
import { useDrive } from "@/hooks/useDrive"
import { useArea } from "@/hooks/useAreas"
import { useChurch } from "@/hooks/useChurches"
import { useAuth } from "@/hooks/useAuth"
import { useState } from "react"
import { formatPhoneNumber} from "@/utils/utils"
//import { useRequirements } from "@/hooks/useRequirements"

const inputClass = "w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:opacity-60"

const userLevel = ["Pathfinder", "TLT", "Master Guide Candidate", "Invested Master Guide", "Staff / Volunteer", "Parent"]
const PFEvents = ["Area Drill Clinic", "Area Drum Clinic", "Drill and Drums Empower Leadership Training", "Previous TX Youth Bootcamp", "Color Guard Certification", "None of the above"]
const signUpSheet = ["Drill Master English", "Drill Master Spanish", "Color Guard English", "Color Guard Spanish", "Drill Leadership", "Drum Beginner", "Drum Intermediate", "Drum Advanced", "Texas Conference Drum Corps", "Chaperone"]



export default function Register() {
  const [page, setPage] = useState(1)
  const [phoneNumber, setPhoneNumber] = useState("")
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

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
        const formatted = formatPhoneNumber(e.target.value)
        setPhoneNumber(formatted)
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
                <input type="checkbox" name="guide_certification" id="guide_certification" />
            </div>
          </>
        }
        {
          page === 2 && 
          <>
            <div className="flex gap-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="dname" className="text-sm font-medium text-black">Director Name</label>
                <input type="text" id = "dname" placeholder="Director Name" className={inputClass} />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="fName" className="text-sm font-medium text-black">Director Phone #</label>
                <input 
                         type="tel" 
                         name="dNumber" 
                         id="dNumber" 
                         value={phoneNumber}
                         onChange={handlePhoneChange}
                         placeholder="(123) 456-7890" 
                         className={inputClass} 
                       />
              </div>
            </div>

            <div className="flex flex-col gap-2"> 
            <label htmlFor="PF_Level" className="text-sm font-medium text-gray-700">What level of Participation are you in pathfinders?</label>
            <select id="PF_Level" name="PF_Level" className = {inputClass}>
                <option value="">Select Option</option>
                {userLevel.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
            </div> 

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">What events have you participated in the past?</label>
              {PFEvents.map((option, index) => (
                <label key={index} className="flex items-center gap-2 text-sm text-gray-900">
                  <input 
                    type="checkbox" 
                    name="past_events" 
                    value={option}
                    className="rounded border-gray-300"
                  />
                  {option}
                </label>
              ))}
            </div>

            <div className="flex flex-col gap-2"> 
            <label htmlFor="certification_option" className="text-sm font-medium text-gray-700">What certification are you signing up for?</label>
            <select id="certification_option" name="certification_option" className = {inputClass}>
                <option value="">Select Option</option>
                {signUpSheet.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
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
                <input type="checkbox" name="requirements_check" id="requirements_check" />
            </div>
            </div>
          </>

        }

      </form>


      <div className="flex gap-3">
        <Button 
      onClick={() => page > 1  && setPage(page - 1)}
      variant="secondary"
      className='w-full shadow-sm hover:shadow-md transition-all duration-200 py-3'
    >
      Previous
    </Button>
        <Button 
      onClick={() => page < 3 && setPage(page + 1)}
      variant="primary"
      className='w-full shadow-sm hover:shadow-md transition-all duration-200 py-3'
    >
      Next
    </Button>
      </div>
      




    </section>
  )
}
