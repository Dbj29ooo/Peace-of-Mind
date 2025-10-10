import { useState } from 'react'
import EmailCaptureDialog from '../EmailCaptureDialog'

export default function EmailCaptureDialogExample() {
  const [open, setOpen] = useState(true)

  return (
    <EmailCaptureDialog 
      open={open} 
      onEmailSubmit={(email) => {
        console.log('Email submitted:', email)
        setOpen(false)
      }} 
    />
  )
}
