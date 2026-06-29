import Button from "@/components/ui/Button"
//import { useState } from "react"
import { useDrive } from "@/hooks/useDrive"
import { useArea } from "@/hooks/useAreas"
import { useChurch } from "@/hooks/useChurches"
//import { useRequirements } from "@/hooks/useRequirements"

const inputClass = "w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"

export default function HomePage() {
  //const [selectedArea, setSelectedArea] = useState(0)
  //const [selectedChurch, setSelectedChurch] = useState("")
  const { loading, error, uploadResult, uploadPayload } = useDrive("1aPBBTgcfqSu0TutoAIp0tmwKe3ONg9SH")
  const { areas, loading: areaLoading } = useArea()
  const { churches, loading: churchLoading, getByArea } = useChurch(1)
  //const { resMessage, update } = useRequirements()




  async function handleAreaChange(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault()
    const id = Number(e.target.value)
    getByArea(id)
  }


  async function handleFormSubmit(e: React.SyntheticEvent<HTMLFormElement>) {

    e.preventDefault()

    const data = new FormData(e.currentTarget)

    const fname = data.get("fName") as string
    const lname = data.get("lName") as string
    const areaId = Number(data.get("AreaSelect") as string)
    const churchId = Number(data.get("ChurchSelect") as string)

    const area = areas.find(area => area.id === areaId)
    const church = churches.find(church => church.id === churchId)

    const recordCard = data.get('RecordCard') as File | null
    const entranceEssay = data.get('EntranceEssay') as File | null
    const notes = data.get('Notes') as File | null
    const recommendation = data.get('Recommendation') as File | null

    console.log(recordCard)

    console.log(notes)

    const payload = {
      "fname": fname,
      "lname": lname,
      "recordCard": recordCard,
      "entranceEssay": entranceEssay,
      "notes": notes,
      "recommendation": recommendation
    }
    {
      // const payloadRequirements = {
      //   "recordCard": recordCard?.name ? 1 : 0,
      //   "entranceEssay": entranceEssay?.name ? 1 : 0,
      //   "notes": notes?.name ? 1 : 0,
      //   "recommendation": recommendation?.name ? 1 : 0,
      //   "userId": 1
      // }

      await uploadPayload(payload, `Source Folder/${area?.name}/${church?.name} ${church?.cname}`)
      //await update(payloadRequirements)

    }
  }

  return (
    <section className="mx-auto max-w-xl px-4 py-10">
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-8">

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-900">General Information</h2>

          <div className="flex flex-col gap-1">
            <label htmlFor="fName" className="text-sm font-medium text-gray-700">First Name</label>
            <input required type="text" id="fName" name="fName" className={inputClass} />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="lName" className="text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" id="lName" name="lName" className={inputClass} />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="AreaSelect" className="text-sm font-medium text-gray-700">Area</label>
            <select id="AreaSelect" name="AreaSelect" className={inputClass} onChange={handleAreaChange} disabled={areaLoading}>
              {areaLoading && <option>Loading...</option>}
              {areas.map(option => (
                <option key={option.id} value={option.id}>{option.sname}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="ChurchSelect" className="text-sm font-medium text-gray-700">Church</label>
            <select id="ChurchSelect" name="ChurchSelect" className={inputClass} disabled={churchLoading}>
              {churchLoading && <option>Loading...</option>}
              {(churches ?? []).map(option => (
                <option key={option.id} value={option.id} >{option.name} {option.cname}</option>
              ))}
            </select>
          </div>
        </div>

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

        <Button type="submit" variant="primary" size="md" className="self-end">Submit</Button>

      </form>

      <div>
        {loading && <div>Uploading Files...</div>}
        {error && <div>There was an error with: {error}</div>}
        {uploadResult && <div>{uploadResult.message}</div>}
        {/* {resMessage && <div>{resMessage}</div>} */}
      </div>
    </section>
  )
}
