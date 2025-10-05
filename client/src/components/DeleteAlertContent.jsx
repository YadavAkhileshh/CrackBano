import React from 'react'

function DeleteAlertContent({content,onDelete}) {
  return (
    <div className="p-5">
      <p className="text-[14px]"></p>
      <div className="flex justify-center mt-6"><button type="button" className="btn-small" onClick={onDelete}>Delete</button></div>
    </div>
  )
}

export default DeleteAlertContent
