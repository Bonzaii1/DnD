import Button from "@/components/ui/Button"
//import { useState } from "react"
import { useDrive } from "@/hooks/useDrive"
import { useArea } from "@/hooks/useAreas"
import { useChurch } from "@/hooks/useChurches"
import { useAuth } from "@/hooks/useAuth"
import { useState } from "react"
//import { useRequirements } from "@/hooks/useRequirements"

const inputClass = "w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"

export default function Register() {
  const [page, setPage] = useState(1)
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



  return (
    //Form Object
    <section className="p-4 flex flex-col bg-white rounded-xl md:max-w-md  gap-4 md:p-8 md:border md:border-gray-300 justify-center mx-auto ">

      <form className="flex flex-col gap-5 md:p-4"> 
        { page === 1 &&
          <>
            <h2 className="font-bold">Personal Info</h2>
            <div className="flex gap-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="fName" className="text-sm font-medium text-black">First Name</label>
                <input type="text" id = "fName" placeholder="First Name" className={inputClass} />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="fName" className="text-sm font-medium text-black">Last Name</label>
                <input type="text" id = "fName" placeholder="First Name" className={inputClass} />
              </div>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="fName" className="text-sm font-medium text-black">Area</label>
                <input type="text" id = "fName" placeholder="Area Name" className={inputClass} />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="fName" className="text-sm font-medium text-black">Church</label>
                <input type="text" id = "fName" placeholder="Area Name" className={inputClass} />
            </div>

            
          </>
        }
        {
          page === 2 && 
          <>
            <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-gray-900">Attendance Requirements</h2>

            {[
              { id: "RecordCard", label: "Record Card" },
              { id: "EntranceEssay", label: "Entrance Essay" },
              { id: "Notes", label: "Notes" },
              { id: "Recommendation", label: "Recommendation" },
            ].map(({ id, label }) => (
              <div key={id} className="flex flex-col gap-1">
                <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
                <input type="file" id={id} name={id} className="text-sm text-gray-600 file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200" />
              </div>
            ))}
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
      onClick={() => page < 2 && setPage(page + 1)}
      variant="primary"
      className='w-full shadow-sm hover:shadow-md transition-all duration-200 py-3'
    >
      Next
    </Button>
      </div>
      




    </section>
  )
}
