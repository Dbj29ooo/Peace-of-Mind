import EmailCaptureDialog from '../EmailCaptureDialog'

export default function EmailCaptureDialogExample() {
  return (
    <EmailCaptureDialog 
      open={true} 
      onEmailSubmit={(email) => {
        console.log('Email submitted:', email)
      }} 
    />
  )
}
