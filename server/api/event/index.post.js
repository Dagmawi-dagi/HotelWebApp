import { saveFile } from '../../../server/utils/saveFileUpload'
import modelsRef from '../../../server/database/models/modelsRefs'
import withErrorHandler from '../../../server/utils/catchAsync'
import { commonController } from '../../../server/service/commonCrud'

export default withErrorHandler( async(event) => {
  const result = await commonController(event,modelsRef.event.model).create(event.context.modifiedBody)
  // save the uploaded files if the create crud goes successfully
  for (const file of event.context.uploadedFiles || []) await saveFile(file.buffer, file.filePath); // processed buffer is already ready
  return{
    status: 'success',
    data: result
  }
})