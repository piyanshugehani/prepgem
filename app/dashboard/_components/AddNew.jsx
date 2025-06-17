"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAPIModel'
import { LoaderCircle } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid';
import { MockInterview } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { db } from '@/utils/db'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'


function AddNew() {
    const [openDialog, setOpenDialog] = useState(false)
    const [jobPos, setJobPos] = useState('')
    const [jobDesc, setJobDesc] = useState('')
    const [jobExp, setJobExp] = useState(0)
    const [loading,setLoading]=useState(false)
    const [jsonRes,setJsonRes]=useState([])
    const {user}=useUser()
    const router=useRouter()

    const onSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        console.log("values", jobPos, jobDesc, jobExp);

        const InputMsg = `job position: ${jobPos}, job description: ${jobDesc}, Years of experience: ${jobExp}. On the basis of following information, give me 5 interview questions along with their answers in JSON format. Give question and answer as fields in JSON.`
        const result = await chatSession.sendMessage(InputMsg);
        const JsonResp=(result.response.text()).replace('```json','').replace('```','')
        console.log("resp",JSON.parse(JsonResp));

        setJsonRes(JsonResp)
        
        if (JsonResp) {
            const response=await db.insert(MockInterview)
        .values({
            mockId:uuidv4(),
            jsonMockResp:JsonResp,
            jobPosition:jobPos,
            jobDesc:jobDesc,
            jobExperience:jobExp,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format('DD-MM-yyyy')
        }).returning({mockId:MockInterview.mockId})

        console.log("Inserted id",response);
        setOpenDialog(false)
        router.push(`dashboard/interview/${response[0].mockId}`)
        }
        else{
            console.log("ERR");
            
        }

        setLoading(false)
    }


    return (
        <div>
<section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-black/90 to-slate-900 p-8 shadow-2xl">
  <div className="flex items-center justify-between">
    <div className="flex flex-col gap-6 max-w-full z-10">
      <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
        Get Interview-Ready with AI-Powered Practice & Feedback
      </h2>
      <p className="text-lg text-slate-300">
        Practice real interview questions & get instant feedback
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={() => setOpenDialog(true)} 
          className="bg-gradient-to-r from-purple-200 to-purple-400 hover:from-purple-400 hover:to-purple-300 text-gray-800 font-semibold px-4 sm:px-8 py-3 rounded-xl w-full sm:w-fit text-sm sm:text-base shadow-lg transition-all duration-200 hover:scale-105"
        >
          Start New Interview with JD
        </Button>
        <Button 
          onClick={() => router.push('/interview')} 
          className="bg-gray-900 hover:bg-gray-900 border border-white/20 text-white font-semibold px-4 sm:px-8 py-3 rounded-xl w-full sm:w-fit text-sm sm:text-base shadow-lg transition-all duration-200 hover:scale-105"
        >
          Have a 1-1 Interview with AI
        </Button>
      </div>
    </div>

    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-purple-400/20 blur-3xl rounded-full"></div>
      <Image
        src="/robot.png"
        alt="AI Interview Assistant"
        width={400}
        height={400}
        className="max-sm:hidden relative z-10 animate-float"
      />
    </div>
  </div>
  
  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-400/10 blur-3xl -z-10"></div>
</section>
        
<Dialog open={openDialog}>
    <DialogContent className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/20">
        <DialogHeader className="space-y-4">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                Tell us more about your job details
            </DialogTitle>
            <DialogDescription>
                <div className="space-y-6">
                    <h2 className="text-slate-300">Add details for job position/role, job description and years of experience</h2>

                    <form onSubmit={onSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-purple-300">Job Position/Role</label>
                            <Input 
                                className="bg-gray-800/50 border-purple-500/30 focus:border-purple-400 focus:ring-purple-400/20"
                                placeholder="Eg. Full Stack Dev" 
                                onChange={(e) => setJobPos(e.target.value)} 
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-purple-300">Job Description (Tech Stack)</label>
                            <Textarea 
                                className="bg-gray-800/50 border-purple-500/30 focus:border-purple-400 focus:ring-purple-400/20 min-h-[100px]"
                                placeholder="Eg. React, Angular, etc" 
                                onChange={(e) => setJobDesc(e.target.value)} 
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-purple-300">Years of experience</label>
                            <Input 
                                className="bg-gray-800/50 border-purple-500/30 focus:border-purple-400 focus:ring-purple-400/20"
                                placeholder="Eg. 5" 
                                type="number" 
                                max="50" 
                                onChange={(e) => setJobExp(e.target.value)} 
                                required
                            />
                        </div>

                        <div className="flex gap-4 justify-end pt-4">
                            <Button 
                                type="button" 
                                variant="ghost" 
                                onClick={() => setOpenDialog(false)}
                                className="text-purple-300 hover:text-purple-200 hover:bg-purple-500/10"
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                disabled={loading}
                                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/25"
                            >
                                {loading ? (
                                    <>
                                        <LoaderCircle className="animate-spin mr-2" /> 
                                        Generating...
                                    </>
                                ) : "Start Interview"}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogDescription>
        </DialogHeader>
    </DialogContent>
</Dialog>
        </div>

    )
}

export default AddNew