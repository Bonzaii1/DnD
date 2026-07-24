import Button from "@/components/ui/Button";
import Navbar from "@/components/ui/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { useArea } from "@/hooks/useAreas"
import { useChurch } from "@/hooks/useChurches"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatPhoneNumber} from "@/utils/utils"

const inputClass = "w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:opacity-60"



const userLevel = ["Pathfinder", "TLT", "Master Guide Candidate", "Invested Master Guide", "Staff / Volunteer", "Parent"]


export default function SignUp(){
    const navigate = useNavigate()
    const { user, loading, error, updateUser } = useAuth()
    const [phoneNumber, setPhoneNumber] = useState(user?.phone_number ? user?.phone_number : "")
    const [pfLevel, setPfLevel] = useState(user?.role || "")
    // const [bootCampFlag, setBootCampFlag] = useState(user?.bootcamp_flag ? true : false)
    // const [bootcampOption, setBootcampOption] = useState(user?.bootcamp_option || "")
    const { areas  } = useArea()
    const { churches } = useChurch(null)


    const userArea = areas.find(area => area.id === user!.areaId)
    const userChurch = churches.find(church => church.id === user!.churchId)

    function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
        const formatted = formatPhoneNumber(e.target.value)
         setPhoneNumber(formatted)
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        
        const formData = new FormData(e.currentTarget)
        
        const updatedUser = {
            id: user!.id,
            fname: formData.get('fName') as string,
            lname: formData.get('lName') as string,
            email: formData.get('email') as string,
            phone_number: phoneNumber,
            date_of_birth: new Date(formData.get('date_of_birth') as string),
            role: pfLevel,
            churchId: user!.churchId,
            areaId: user!.areaId,
            picture: user!.picture,
            active: user!.active,
            google_sub: user!.google_sub
        }
        
        await updateUser(updatedUser)

        if (!error) navigate('/register') 
        
    }


    return (
        <div className="flex min-h-screen flex-col bg-[#f5f8ff] text-gray-900 antialiased">
        <header className="border-b border-gray-200">
            <Navbar />
        </header>

        <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
            <section className="p-4 flex flex-col bg-white rounded-xl md:max-w-md  gap-4 md:p-8 md:border md:border-gray-300 justify-center mx-auto ">
       
             <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:p-4">        
                 
                   <h2 className="font-bold">Personal Info</h2>
                   <div className="flex gap-2">
                     <div className="flex flex-col gap-1">
                       <label htmlFor="fName" className="text-sm font-medium text-black">First Name</label>
                       <input type="text" id="fName" name="fName" defaultValue = {user?.fname} placeholder={user?.fname} className={inputClass} />
                     </div>
                     <div className="flex flex-col gap-1">
                       <label htmlFor="lName" className="text-sm font-medium text-black">Last Name</label>
                       <input type="text" id="lName" name="lName" defaultValue={user?.lname} placeholder={user?.lname} className={inputClass} />
                     </div>
                   </div>

                   <div className="flex flex-col gap-1">
                        <label htmlFor="Area" className="text-sm font-medium text-black">Area</label>
                        <input type="text" id = "Area" defaultValue={userArea ? userArea?.sname : ""} className={inputClass} disabled />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="Church" className="text-sm font-medium text-black">Church</label>
                        <input type="text" id = "Church" defaultValue = {userChurch ? `${userChurch.name} ${userChurch.cname}` : ''} className={inputClass} disabled />
                    </div>
       
                   <div className="flex flex-col gap-1">
                       <label htmlFor="email" className="text-sm font-medium text-black">Email</label>
                       <input type="email" name="email" id="email" defaultValue={user?.email} placeholder ={user?.email} className={inputClass} />
                   </div>
       
                   <div className="flex flex-col gap-1">
                       <label htmlFor="pNumber" className="text-sm font-medium text-black">Phone Number</label>
                       <input 
                         type="tel" 
                         name="pNumber" 
                         id="pNumber" 
                         value={phoneNumber}
                         onChange={handlePhoneChange}
                         placeholder="(123) 456-7890" 
                         className={inputClass} 
                       />
                   </div>

                   <div className="flex flex-col gap-1">
                       <label htmlFor="pNumber" className="text-sm font-medium text-black">Date of Birth</label>
                       <input 
                        type="date" 
                        name="date_of_birth" 
                        id="date_of_birth" 
                        defaultValue={user?.date_of_birth ? new Date(user.date_of_birth).toISOString().split('T')[0] : ""} 
                        className={inputClass} 
                        />
                    </div>

                    <div className="flex flex-col gap-2"> 
                    <label htmlFor="PF_Level" className="text-sm font-medium text-gray-700">What level of Participation are you in pathfinders?</label>
                    <select 
                    id="PF_Level" 
                    name="PF_Level" 
                    className={inputClass}
                    value={pfLevel}
                    onChange={(e) => setPfLevel(e.target.value)}
                    >
                        <option value="">Select Option</option>
                        {userLevel.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                    </div> 
                    

                   {/* <div className="flex flex-col gap-1 items-start">
                       <label htmlFor="pNumber" className="text-sm font-medium text-black">Have you attended a previous Bootcamp</label>
                       <input type="checkbox" name="bootcamp_flag" id="bootcamp_flag" checked={bootCampFlag} onChange={(e) => setBootCampFlag(e.target.checked)} />
                   </div>

                   <div className="flex flex-col gap-1">
                        <label htmlFor="bootcamp_option" className="text-sm font-medium text-gray-700">Which have you done?</label>
                        <select id="bootcamp_option" name="bootcamp_option" value={bootCampFlag ? bootcampOption : ""} className={inputClass} disabled = {!bootCampFlag} onChange={(e) => setBootcampOption(e.target.value)}>
                            <option value="">Select Option</option>
                            {testList.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div> */}

                <Button 
                    type="submit"
                    variant="primary"
                    className='w-full shadow-sm hover:shadow-md transition-all duration-200 py-3'
                >
                    Submit
                </Button>
                   
             </form>

               {loading && <p className='text-xs text-gray-500'>Loading...</p>}
               {error && <p className='text-xs text-red-600'>{error}</p>}

               
             
             
       
       
       
       
           </section>
        </main>

        <footer className="border-t border-gray-200 px-6 py-4 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} App</p>
        </footer>
        </div>
         
    )
} 