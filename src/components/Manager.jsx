import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify'

const Manager = () => {
  const [showHide, setShowHide] = useState("Show")
  const [inputType, setInputType] = useState("password")
  const [form, setForm] = useState({site: "", username: "", password: ""})
  const [passwordArray, setPasswordArray] = useState([])
  const [editId, setEditId] = useState("")
  const [editShowHide, setEditShowHide] = useState("Show")
  const [editInputType, setEditInputType] = useState("password")
  const [editForm, setEditForm] = useState({site: "", username: "", password: "", id: ""})

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    console.log(passwords)
    setPasswordArray(passwords)
  }

  useEffect(() => {
    getPasswords()
  }, [])

  function handleChange(e) {
    setForm({...form, [e.target.name]: e.target.value})
  }

  function showPassword() {
    if (showHide === "Show") {
      setInputType("text")
      setShowHide("Hide")
    } else {
      setInputType("password")
      setShowHide("Show")
    }
  }

  const savePassword = async () => {
    if (form.site.length >= 3 && form.username.length >= 1 && form.password.length >= 4) {
      console.log([...passwordArray, {...form, id: uuidv4()}])
      const updatedArray = [...passwordArray, { ...form, id: uuidv4() }]
      setPasswordArray(updatedArray)
      fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
      // localStorage.setItem("passwords", JSON.stringify(updatedArray))
      setForm({ site: "", username: "", password: "" })
      toast.success('Saved password!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          whiteSpace: "normal",
          wordBreak: "break-word",
          maxWidth: "90%",
          alignSelf: "center"
        }
      })
    } else {
      toast.error('Website URL / Username / Password is too short!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          whiteSpace: "normal",
          wordBreak: "break-word",
          maxWidth: "90%",
          alignSelf: "center"
        }
      })
    }
  }

  function copyText(text) {
    navigator.clipboard.writeText(text)
    toast.success(`Copied: '${text}'`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      style: {
        whiteSpace: "normal",
        wordBreak: "break-word",
        maxWidth: "90%",
        alignSelf: "center"
      }
    })
  }

  function editText(id) {
    setEditId(id)
    setEditForm(passwordArray.filter(item => item.id === id)[0])
    console.log(`Editing password with id: ${id}`)
  }

  function handleEdit(e) {
    setEditForm({...editForm, [e.target.name]: e.target.value})
    console.log("handleEdit is called!")
  }

  function editShowPassword() {
    if (editShowHide === "Show") {
      setEditInputType("text")
      setEditShowHide("Hide")
    } else {
      setEditInputType("password")
      setEditShowHide("Show")
    }
  }

  function saveEdit() {
    const updatedArray = [...passwordArray.filter(item => item.id !== editId), editForm]
    setPasswordArray(updatedArray)
    fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
    // localStorage.setItem("passwords", JSON.stringify(updatedArray))
    setEditId("")
    setEditForm({site: "", username: "", password: ""})
    toast.success('Saved edited values!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      style: {
        whiteSpace: "normal",
        wordBreak: "break-word",
        maxWidth: "90%",
        alignSelf: "center"
      }
    })
  }

  function cancelEdit() {
    setEditId("")
    setEditForm({site: "", username: "", password: ""})
    toast.info('Cancelled editing!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      style: {
        whiteSpace: "normal",
        wordBreak: "break-word",
        maxWidth: "90%",
        alignSelf: "center"
      }
    })
  }

  function deleteText(id) {
    if (confirm("Are you sure to delete this input?")) {
      console.log(`Deleting password with id: ${id}`)
      const updatedArray = passwordArray.filter(item => item.id !== id);
      setPasswordArray(updatedArray);
      fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify(passwordArray.filter(item => item.id === id)[0]) })
      // localStorage.setItem("passwords", JSON.stringify(updatedArray));
      toast.success('Deleted password!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          whiteSpace: "normal",
          wordBreak: "break-word",
          maxWidth: "90%",
          alignSelf: "center"
        }
      })
    }
  }

  return (
    // <div className="w-full px-4 flex justify-center">
    <div className='flex flex-col w-full max-w-5xl p-3 items-stretch gap-5 overflow-y-auto'>
      <h1 className='audiowide-regular text-2xl text-center md:text-3xl'>PassOp</h1>
      <div className='flex flex-col items-center gap-y-3 text-sm md:text-base'>
        <input type='text' name='site' value={form.site} placeholder='Enter website URL' id='site' className='w-4/5 sm:max-w-xl border-2 rounded-full px-3 py-1' onChange={handleChange} />
        <div className='flex flex-col w-3/5 gap-y-3 sm:flex-row sm:w-4/5 sm:max-w-xl sm:gap-x-3'>
          <input type='text' name='username' value={form.username} placeholder='Enter username' id='username' className='border-2 rounded-full flex-auto px-3 py-1' onChange={handleChange} />
          <div className='relative'>
            <input type={inputType} name='password' value={form.password} placeholder='Enter password' id='password' className='w-full border-2 rounded-full flex-auto pl-3 pr-8 py-1' onChange={handleChange} />
            <button className='absolute right-3 top-1/4 text-xs md:text-sm' onClick={showPassword}>{showHide}</button>
          </div>
        </div>
        <button className='bg-violet-700 hover:bg-violet-800 active:bg-violet-900 w-fit max-w-full border-3 border-violet-900 hover:border-violet-950 active:border-black rounded-full cursor-pointer px-3 py-1 font-bold text-amber-200 text-center' onClick={savePassword}>Save Password</button>
      </div>
      {passwordArray.length === 0 && <div>No password to show!</div>}
      {passwordArray.length !== 0 && <div className='flex flex-col items-stretch overflow-x-auto'>
        <table className="table-auto w-auto min-w-xl rounded-xl overflow-hidden text-xs md:text-sm">
          <thead className='bg-violet-800 text-gray-100'>
            <tr>
              <th className='px-2 py-0.5'>Site</th>
              <th className='px-2 py-0.5'>Username</th>
              <th className='px-2 py-0.5'>Password</th>
              <th className='px-2 py-0.5'>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-gray-200 truncate'>
            {editId === "" && passwordArray.map((item, index) => {
              return <tr key={index}>
                <td className='px-2 py-0.5'>
                  <div className='flex justify-center gap-1'>
                    <span>{item.site}</span>
                    <img src="https://img.icons8.com/material-rounded/20/copy.png" alt="copy--v1" className='size-4 md:size-5' onClick={() => copyText(item.site)}/>
                  </div>
                </td>
                <td className='px-2 py-0.5'>
                  <div className='flex justify-center gap-1'>
                    <span>{item.username}</span>
                    <img src="https://img.icons8.com/material-rounded/20/copy.png" alt="copy--v1" className='size-4 md:size-5' onClick={() => copyText(item.username)}/>
                  </div>
                </td><td className='px-2 py-0.5'>
                  <div className='flex justify-center gap-1'>
                    <span>{item.password}</span>
                    <img src="https://img.icons8.com/material-rounded/20/copy.png" alt="copy--v1" className='size-4 md:size-5' onClick={() => copyText(item.password)}/>
                  </div>
                </td>
                <td className='px-2 py-0.5'>
                  <div className='flex justify-center gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 32 32" onClick={() => editText(item.id)}>
                      <path d="M 23.90625 3.96875 C 22.859375 3.96875 21.8125 4.375 21 5.1875 L 5.1875 21 L 5.125 21.3125 L 4.03125 26.8125 L 3.71875 28.28125 L 5.1875 27.96875 L 10.6875 26.875 L 11 26.8125 L 26.8125 11 C 28.4375 9.375 28.4375 6.8125 26.8125 5.1875 C 26 4.375 24.953125 3.96875 23.90625 3.96875 Z M 23.90625 5.875 C 24.410156 5.875 24.917969 6.105469 25.40625 6.59375 C 26.378906 7.566406 26.378906 8.621094 25.40625 9.59375 L 24.6875 10.28125 L 21.71875 7.3125 L 22.40625 6.59375 C 22.894531 6.105469 23.402344 5.875 23.90625 5.875 Z M 20.3125 8.71875 L 23.28125 11.6875 L 11.1875 23.78125 C 10.53125 22.5 9.5 21.46875 8.21875 20.8125 Z M 6.9375 22.4375 C 8.136719 22.921875 9.078125 23.863281 9.5625 25.0625 L 6.28125 25.71875 Z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 16 16" onClick={() => deleteText(item.id)}>
                      <path d="M 6.496094 1 C 5.675781 1 5 1.675781 5 2.496094 L 5 3 L 2 3 L 2 4 L 3 4 L 3 12.5 C 3 13.324219 3.675781 14 4.5 14 L 10.5 14 C 11.324219 14 12 13.324219 12 12.5 L 12 4 L 13 4 L 13 3 L 10 3 L 10 2.496094 C 10 1.675781 9.324219 1 8.503906 1 Z M 6.496094 2 L 8.503906 2 C 8.785156 2 9 2.214844 9 2.496094 L 9 3 L 6 3 L 6 2.496094 C 6 2.214844 6.214844 2 6.496094 2 Z M 4 4 L 11 4 L 11 12.5 C 11 12.78125 10.78125 13 10.5 13 L 4.5 13 C 4.21875 13 4 12.78125 4 12.5 Z M 5 5 L 5 12 L 6 12 L 6 5 Z M 7 5 L 7 12 L 8 12 L 8 5 Z M 9 5 L 9 12 L 10 12 L 10 5 Z"></path>
                    </svg>
                  </div>
                </td>
              </tr>
            })}
            {editId && passwordArray.filter(item => item.id < editId).map((item, index) => {
              return <tr key={index}>
                <td className='px-2 py-0.5'>
                  <div className='flex justify-center gap-1'>
                    <span>{item.site}</span>
                    <img src="https://img.icons8.com/material-rounded/20/copy.png" alt="copy--v1" className='size-4 md:size-5' onClick={() => copyText(item.site)}/>
                  </div>
                </td>
                <td className='px-2 py-0.5'>
                  <div className='flex justify-center gap-1'>
                    <span>{item.username}</span>
                    <img src="https://img.icons8.com/material-rounded/20/copy.png" alt="copy--v1" className='size-4 md:size-5' onClick={() => copyText(item.username)}/>
                  </div>
                </td><td className='px-2 py-0.5'>
                  <div className='flex justify-center gap-1'>
                    <span>{item.password}</span>
                    <img src="https://img.icons8.com/material-rounded/20/copy.png" alt="copy--v1" className='size-4 md:size-5' onClick={() => copyText(item.password)}/>
                  </div>
                </td>
                <td className='px-2 py-0.5'>
                  <div className='flex justify-center gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 32 32" onClick={() => editText(item.id)}>
                      <path d="M 23.90625 3.96875 C 22.859375 3.96875 21.8125 4.375 21 5.1875 L 5.1875 21 L 5.125 21.3125 L 4.03125 26.8125 L 3.71875 28.28125 L 5.1875 27.96875 L 10.6875 26.875 L 11 26.8125 L 26.8125 11 C 28.4375 9.375 28.4375 6.8125 26.8125 5.1875 C 26 4.375 24.953125 3.96875 23.90625 3.96875 Z M 23.90625 5.875 C 24.410156 5.875 24.917969 6.105469 25.40625 6.59375 C 26.378906 7.566406 26.378906 8.621094 25.40625 9.59375 L 24.6875 10.28125 L 21.71875 7.3125 L 22.40625 6.59375 C 22.894531 6.105469 23.402344 5.875 23.90625 5.875 Z M 20.3125 8.71875 L 23.28125 11.6875 L 11.1875 23.78125 C 10.53125 22.5 9.5 21.46875 8.21875 20.8125 Z M 6.9375 22.4375 C 8.136719 22.921875 9.078125 23.863281 9.5625 25.0625 L 6.28125 25.71875 Z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 16 16" onClick={() => deleteText(item.id)}>
                      <path d="M 6.496094 1 C 5.675781 1 5 1.675781 5 2.496094 L 5 3 L 2 3 L 2 4 L 3 4 L 3 12.5 C 3 13.324219 3.675781 14 4.5 14 L 10.5 14 C 11.324219 14 12 13.324219 12 12.5 L 12 4 L 13 4 L 13 3 L 10 3 L 10 2.496094 C 10 1.675781 9.324219 1 8.503906 1 Z M 6.496094 2 L 8.503906 2 C 8.785156 2 9 2.214844 9 2.496094 L 9 3 L 6 3 L 6 2.496094 C 6 2.214844 6.214844 2 6.496094 2 Z M 4 4 L 11 4 L 11 12.5 C 11 12.78125 10.78125 13 10.5 13 L 4.5 13 C 4.21875 13 4 12.78125 4 12.5 Z M 5 5 L 5 12 L 6 12 L 6 5 Z M 7 5 L 7 12 L 8 12 L 8 5 Z M 9 5 L 9 12 L 10 12 L 10 5 Z"></path>
                    </svg>
                  </div>
                </td>
              </tr>
            })}
            {editId && passwordArray.filter(item => item.id === editId).map((item, index) => {
              return <tr key={index}>
                <td className='px-2 py-0.5'>
                  <div className='flex justify-center'>
                    <input type='text' name='site' value={editForm.site} placeholder='Enter website URL' id='site' className='w-full border-2 rounded-full px-1.5 py-0.5 md:px-2' onChange={handleEdit} />
                  </div>
                </td>
                <td className='px-2 py-0.5'>
                  <div className='flex justify-center'>
                    <input type='text' name='username' value={editForm.username} placeholder='Enter username' id='username' className='w-full border-2 rounded-full px-1.5 py-0.5 md:px-2' onChange={handleEdit} />
                  </div>
                </td>
                <td className='px-2 py-0.5'>
                  <div className='relative flex justify-center'>
                    <input type={editInputType} name='password' value={editForm.password} placeholder='Enter password' id='password' className='w-full border-2 rounded-full px-1.5 py-0.5 md:px-2' onChange={handleEdit} />
                    <button className='absolute right-3 top-1 text-[10px] md:text-xs' onClick={editShowPassword}>{editShowHide}</button>
                  </div>
                </td>
                <td className='px-2 py-0.5'>
                  <div className='flex justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24" onClick={saveEdit}>
                      <path d="M 20.738281 5.9941406 A 1.250125 1.250125 0 0 0 19.878906 6.3730469 L 9 17.234375 L 4.1152344 12.361328 A 1.250125 1.250125 0 1 0 2.3496094 14.130859 L 8.1171875 19.884766 A 1.250125 1.250125 0 0 0 9.8828125 19.884766 L 21.644531 8.140625 A 1.250125 1.250125 0 0 0 20.738281 5.9941406 z"></path>
                    </svg>
                    <button className="material-symbols-outlined" onClick={() => cancelEdit(item.id)}>close</button>
                  </div>
                </td>
              </tr>
            })}
            {editId && passwordArray.filter(item => item.id > editId).map((item, index) => {
              return <tr key={index}>
                <td className='px-2 py-0.5'>
                  <div className='flex justify-center gap-1'>
                    <span>{item.site}</span>
                    <img src="https://img.icons8.com/material-rounded/20/copy.png" alt="copy--v1" className='size-4 md:size-5' onClick={() => copyText(item.site)}/>
                  </div>
                </td>
                <td className='px-2 py-0.5'>
                  <div className='flex justify-center gap-1'>
                    <span>{item.username}</span>
                    <img src="https://img.icons8.com/material-rounded/20/copy.png" alt="copy--v1" className='size-4 md:size-5' onClick={() => copyText(item.username)}/>
                  </div>
                </td><td className='px-2 py-0.5'>
                  <div className='flex justify-center gap-1'>
                    <span>{item.password}</span>
                    <img src="https://img.icons8.com/material-rounded/20/copy.png" alt="copy--v1" className='size-4 md:size-5' onClick={() => copyText(item.password)}/>
                  </div>
                </td>
                <td className='px-2 py-0.5'>
                  <div className='flex justify-center gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 32 32" onClick={() => editText(item.id)}>
                      <path d="M 23.90625 3.96875 C 22.859375 3.96875 21.8125 4.375 21 5.1875 L 5.1875 21 L 5.125 21.3125 L 4.03125 26.8125 L 3.71875 28.28125 L 5.1875 27.96875 L 10.6875 26.875 L 11 26.8125 L 26.8125 11 C 28.4375 9.375 28.4375 6.8125 26.8125 5.1875 C 26 4.375 24.953125 3.96875 23.90625 3.96875 Z M 23.90625 5.875 C 24.410156 5.875 24.917969 6.105469 25.40625 6.59375 C 26.378906 7.566406 26.378906 8.621094 25.40625 9.59375 L 24.6875 10.28125 L 21.71875 7.3125 L 22.40625 6.59375 C 22.894531 6.105469 23.402344 5.875 23.90625 5.875 Z M 20.3125 8.71875 L 23.28125 11.6875 L 11.1875 23.78125 C 10.53125 22.5 9.5 21.46875 8.21875 20.8125 Z M 6.9375 22.4375 C 8.136719 22.921875 9.078125 23.863281 9.5625 25.0625 L 6.28125 25.71875 Z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 16 16" onClick={() => deleteText(item.id)}>
                      <path d="M 6.496094 1 C 5.675781 1 5 1.675781 5 2.496094 L 5 3 L 2 3 L 2 4 L 3 4 L 3 12.5 C 3 13.324219 3.675781 14 4.5 14 L 10.5 14 C 11.324219 14 12 13.324219 12 12.5 L 12 4 L 13 4 L 13 3 L 10 3 L 10 2.496094 C 10 1.675781 9.324219 1 8.503906 1 Z M 6.496094 2 L 8.503906 2 C 8.785156 2 9 2.214844 9 2.496094 L 9 3 L 6 3 L 6 2.496094 C 6 2.214844 6.214844 2 6.496094 2 Z M 4 4 L 11 4 L 11 12.5 C 11 12.78125 10.78125 13 10.5 13 L 4.5 13 C 4.21875 13 4 12.78125 4 12.5 Z M 5 5 L 5 12 L 6 12 L 6 5 Z M 7 5 L 7 12 L 8 12 L 8 5 Z M 9 5 L 9 12 L 10 12 L 10 5 Z"></path>
                    </svg>
                  </div>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>}
    </div>
    // </div>
  )
}

export default Manager

/**
 * Delete All btn
 * Table padding/w-full
 * Fix table copy, edit, delete btns by colspan/etc.
 * Fancy notification (toast)
 * Make alerts fancy
 * Should only be able to save if length > 3
 * Fix icons size with text size
 * Make btns cursor-pointer
 * Decide md vs lg to increase font size
 * Fancy icons
 * Table problem - Stretch with min-w-xl
 * Title icon (change from default Vite + React)
 * "Saved/Deleted pswd" -> "Pswd saved/deleted"
 * Show/Hide ('****') password in the table
 */