import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { v4 as uuidv4 } from 'uuid'

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", pass: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setpasswordArray(passwords)

    }

    useEffect(() => {
        getPasswords()

    }, [])

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const savePass = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.pass.length > 3) {

            await fetch("http://localhost:3000/", {method:"DELETE", headers:{"Content-Type":"application/json"}, body:JSON.stringify({id: form.id}) })

            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({...form,id:uuidv4()}) })
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            // console.log(passwordArray)
            setform({ site: "", username: "", password: "" })
            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast('Error: Password not saved!')
        }

    }

    const deletePass = async (id) => {
        console.log("Deleting password with id:", id)
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            let res = await fetch("http://localhost:3000/", {method:"DELETE", headers:{"Content-Type":"application/json"}, body:JSON.stringify({id}) })
            toast('Password deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const editPass = (id) => {

        console.log("Editing password with id:", id)
        setform({...passwordArray.filter(item => item.id === id)[0], id:id})
        setpasswordArray(passwordArray.filter(item => item.id !== id))

    }

    const copyText = (text) => {
        toast('🦄 Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

            <div className="md:mycontainer min-h-[80vh]">
                <h1 className='text-4xl text font-bold text-center text-white'>
                    <span className='text-blue-700'>&lt;</span>
                    Lock
                    <span className='text-blue-700'>Vault/&gt;</span>
                </h1>
                <p className='text-blue-500 text-lg text-center py-3'>Your own Password Manager!!</p>

                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input name='site' className='rounded-xl border border-blue-500 w-full p-4 py-1' type="text" id='site' placeholder='Enter Website URL' value={form.site} onChange={handleChange} />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input name='username' id='username' className='rounded-xl border border-blue-500 w-full p-4 py-1' type="text" placeholder='Enter Uername' value={form.username} onChange={handleChange} />

                        <input name='pass' id='pass' className='rounded-xl border border-blue-500 w-full p-4 py-1' type="password" placeholder='Enter Password' value={form.pass} onChange={handleChange} />
                    </div>
                    <button onClick={savePass} className='flex justify-center items-center bg-blue-500 rounded-full px-5 py-2  w-fit hover:bg-blue-400 '>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save Passoword
                    </button>
                </div>

                <div className="passwords">
                    <h2 className='text-white font-bold text-2xl py-4'>Your Passwords</h2>

                    {passwordArray.length === 0 && <div className='text-white'> No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full bg-blue-100 overflow-hidden rounded-md mb-10">
                        <thead className='bg-blue-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Passwords</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white w-32 pl-2'>
                                        <div className='flex'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white w-32 pl-2'>
                                        <div className='flex'>
                                            <span>{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>

                                    </td>
                                    <td className='py-2 border border-white w-32 pl-2'>
                                        <div className='flex '>
                                            <span>{"*".repeat(item.pass.length)}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.pass) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white w-32 pl-2 text-center'>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPass(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePass(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
