/** 
 * api接口的统一出口
 */

// 用户模块接口
import user from '@/api/user';

// 权限模块接口
import auth from '@/api/auth'

import seller from '@/api/seller'

// 导出接口
export default {    
    user,
    auth,
    seller
}
