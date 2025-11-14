import React, { useState } from 'react'
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6'

function Input({value,onChange,label ,placeholder,type}) {
    const[ showPassword,setShowPassword]=useState(false)

    const toggleShowPassword=()=>{
        setShowPassword(!showPassword)
    }
  return (
    <div>
        <label className="text-sm font-medium text-slate-700 mb-2 block">{label}</label>

        <div className="input-box group">
            <input 
                type={type=="password" ? (showPassword ? "text": "password") :type} 
                placeholder={placeholder} 
                className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-400 transition-all duration-200" 
                value={value} 
                onChange={(e)=>onChange(e)} 
            />

            {type =="password" && (
                <>
                {showPassword ?(
                    <FaRegEye size={20} className="text-teal-600 cursor-pointer hover:text-teal-700 transition-all duration-200 hover:scale-110" onClick={toggleShowPassword}/>
                ):(
                    <FaRegEyeSlash size={20} className="text-slate-500 cursor-pointer hover:text-slate-700 transition-all duration-200 hover:scale-110" onClick={toggleShowPassword}/>
                )}
                </>
            )}
        </div>
      
    </div>
  )
}

export default Input
