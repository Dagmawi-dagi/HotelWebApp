import modelsRef from '../../../database/models/modelsRefs'
import { saveFile } from '../../../utils/saveFileUpload'
import withErrorHandler from "../../../utils/catchAsync"
import {commonController} from '../../../service/commonCrud'

export default withErrorHandler( async(event) => {
  const body = event.context.modifiedBody;
  const result = await commonController(event,modelsRef.newsletterSub.model).create(body)
  return{
    status: 'success',
    data: result
  }
})