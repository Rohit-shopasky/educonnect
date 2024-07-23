import { LoginService } from "../service/loginService";
import { ILoginReq } from "../types/interfaces";
import { MessageUtil } from "../utils/message";

export class LoginController extends LoginService {
  
  constructor() {
    super();
  }

  /**
   * Create book
   * @param {*} event
   */
  async login(req: any): Promise<any> {
    const params: ILoginReq = req.body;
    try {
      const result = await this.loginService(params);
      return MessageUtil.success(result, 200);
    } catch (err: any) {
      throw err;
    }
  }
}
