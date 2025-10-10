import { BaseClient, BaseClientConfig, RequestOptions } from "@/lib/web3/base";
import {
  WorkflowData,
  IReport,
  BaseIdentityResponse,
  IPerson,
  IBvnResponse,
  IIdentification,
  FaceVerificationResponse,
  NubanRequest,
  ICustomerReference,
  IVerificationRecord,
  EmploymentRequest,
  GuarantorRequest,
  PropertyRequest,
  PropertyResponse,
  VehicleRequest,
  CountriesResponse,
  StatesResponse,
  LgasResponse,
} from "./types";

export class QuoreIdProvider extends BaseClient {
  constructor() {
    if (!process.env.BLOCK_RADAR_KEY)
      throw new Error("Block Radar API key is required.");

    super({
      debug: process.env.NODE_ENV === "development",
      baseURL: "https://api.qoreid.com/v1",
      headers: {
        "x-api-key": process.env.BLOCK_RADAR_KEY as string,
      },
    });
  }
}

interface TokenResponse {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
}

export class QoreIdClient extends BaseClient {
  private clientId: string;
  private clientSecret: string;
  private accessToken: string | null = null;
  private expiresAt: number | null = null;

  constructor(
    config: BaseClientConfig & { clientId: string; clientSecret: string }
  ) {
    super({ ...config, baseURL: "https://api.qoreid.com" });
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
  }

  private async fetchToken(): Promise<void> {
    const tokenData = await super.request<TokenResponse>("POST", "/token", {
      baseURL: "https://api.qoreid.com", // override
      payload: {
        clientId: this.clientId,
        secret: this.clientSecret,
      },
      headers: { "Content-Type": "application/json" },
    });

    this.accessToken = tokenData.accessToken;
    this.expiresAt = Date.now() + tokenData.expiresIn * 1000 - 60_000; // buffer of 1 min
  }

  private async ensureToken(): Promise<void> {
    if (!this.accessToken || !this.expiresAt || Date.now() >= this.expiresAt) {
      await this.fetchToken();
    }
  }

  async request<T>(
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    await this.ensureToken();

    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
      ...options.headers,
    };

    return super.request<T>(method, endpoint, { ...options, headers });
  }

  async getWorkflowByReference(
    customerReference: string
  ): Promise<WorkflowData> {
    return this.request<WorkflowData>(
      "GET",
      `/workflows/customerReference/${encodeURIComponent(customerReference)}`,
      {}
    );
  }

  /** Get workflow data by workflow ID */
  async getWorkflowById(workflowId: string): Promise<WorkflowData> {
    return this.request<WorkflowData>(
      "GET",
      `/workflows/${encodeURIComponent(workflowId)}`,
      {}
    );
  }

  /** Resend webhook for a flow (by reference or flowId) */
  async resendWebhook(referenceOrFlowId: string) {
    return this.request<object>(
      "POST",
      `/workflows/resendWebhook/${encodeURIComponent(referenceOrFlowId)}`,
      {}
    );
  }

  /** Get workflow report by reference or request ID */
  async getWorkflowReportByReference(customerReference: string) {
    return this.request<IReport>(
      "GET",
      `/workflows/report/customerReference/${encodeURIComponent(
        customerReference
      )}`,
      {}
    );
  }

  async verifyNin(idNumber: string, payload: IPerson) {
    return this.request<BaseIdentityResponse>(
      "POST",
      `/ng/identities/nin/${encodeURIComponent(idNumber)}`,
      { payload }
    );
  }

  async verifyVNin(idNumber: string, payload: IPerson) {
    return this.request<BaseIdentityResponse>(
      "POST",
      `/ng/identities/virtual-nin/${encodeURIComponent(idNumber)}`,
      { payload }
    );
  }

  async verifyNinByPhoneNumber(phone: string, payload: IPerson) {
    return this.request<BaseIdentityResponse>(
      "POST",
      `/ng/identities/nin-phone/${encodeURIComponent(phone)}`,
      { payload }
    );
  }

  async getBvn(bvnNumber: string) {
    return this.request<IBvnResponse>(
      "POST",
      `/ng/identities/bvn-consent/${encodeURIComponent(bvnNumber)}`
    );
  }

  async verifyBvnBasic(
    bvnNumber: string,
    payload: IPerson,
    params?: Record<string, string>
  ) {
    return this.request<BaseIdentityResponse>(
      "POST",
      `/ng/identities/bvn-basic/${encodeURIComponent(bvnNumber)}`,
      { params, payload }
    );
  }

  /** BVN premium */
  async verifyBvnPremium(
    bvnNumber: string,
    payload: IPerson,
    params?: Record<string, string>
  ): Promise<BaseIdentityResponse> {
    return this.request<BaseIdentityResponse>(
      "POST",
      `/ng/identities/bvn-premium/${encodeURIComponent(bvnNumber)}`,
      { params, payload }
    );
  }

  /** BVN Boolean Match */
  async matchBvn(
    bvnNumber: string,
    payload: IPerson,
    params?: Record<string, string>
  ): Promise<BaseIdentityResponse> {
    return this.request<BaseIdentityResponse>(
      "POST",
      `/ng/identities/bvn-match/${encodeURIComponent(bvnNumber)}`,
      { params, payload }
    );
  }

  /** Driver's license face verification */
  async verifyDriversLicense(
    idNumber: string,
    payload: IPerson,
    params?: Record<string, string>
  ): Promise<BaseIdentityResponse> {
    return this.request<BaseIdentityResponse>(
      "POST",
      `/ng/identities/face-verification/drivers-license/${idNumber}`,
      {
        payload,
        params,
      }
    );
  }

  /** Voter's card verification */
  async verifyVotersCard(
    vin: string,
    payload: IPerson,
    params?: Record<string, string>
  ): Promise<BaseIdentityResponse> {
    return this.request<BaseIdentityResponse>(
      "POST",
      `/ng/identities/vin/${vin}`,
      {
        payload,
        params,
      }
    );
  }

  /** Passport */
  async verifyPassword(
    passportNumber: string,
    payload: IPerson,
    params?: Record<string, string>
  ): Promise<BaseIdentityResponse> {
    return this.request<BaseIdentityResponse>(
      "POST",
      `/ng/identities/passport/${passportNumber}`,
      {
        payload,
        params,
      }
    );
  }

  /** BVN Face Verification */
  async verifyBvnFace(payload: IIdentification) {
    return this.request<FaceVerificationResponse>(
      "POST",
      `/ng/identities/face-verification/bvn`,
      {
        payload,
      }
    );
  }

  /** Driver’s License Face Verification */
  async verifyDriversLicenseFace(payload: IIdentification) {
    return this.request<FaceVerificationResponse>(
      "POST",
      `/ng/identities/face-verification/drivers-license`,
      {
        payload,
      }
    );
  }

  //   /** Photo Matching (e.g. ID selfie match) */
  //   async matchPhoto(idNumber: string): Promise<FaceVerificationResponse> {
  //     return this.request<FaceVerificationResponse>(
  //       "POST",
  //       `/ng/identities/face-verification/nin`,
  //       {
  //         payload: { idNumber },
  //       }
  //     );
  //   }

  /** NIN Face Verification */
  async verifyNinFace(
    payload: IIdentification
  ): Promise<FaceVerificationResponse> {
    return this.request<FaceVerificationResponse>(
      "POST",
      `/ng/identities/face-verification/nin`,
      {
        payload,
      }
    );
  }

  /** vNIN Face Verification */
  async verifyVninFace(
    payload: IIdentification
  ): Promise<FaceVerificationResponse> {
    return this.request<FaceVerificationResponse>(
      "POST",
      `/ng/identities/face-verification/vnin`,
      {
        payload,
      }
    );
  }

  /** Nigerian Passport Face Verification */
  async verifyPassportFace(
    payload: IIdentification
  ): Promise<FaceVerificationResponse> {
    return this.request<FaceVerificationResponse>(
      "POST",
      `/ng/identities/face-verification/passport`,
      {
        payload,
      }
    );
  }

  /** CAC Basic (business identity) */
  async verifyCacBasic(regNumber: string) {
    return this.request<BaseIdentityResponse>(
      "POST",
      `/ng/identities/cac-basic`,
      {
        payload: { regNumber },
      }
    );
  }

  /** CAC Premium (if supported) */
  async verifyCacPremium(
    regNumber: string // likely same shape, maybe extra fields
  ) {
    await this.request<never>("POST", `/ng/identities/cac-premium`, {
      payload: { regNumber },
    });

    return true;
  }

  /** TIN lookup (business identification via Tax ID) */
  async getTin(tin: string) {
    return this.request<BaseIdentityResponse>(
      "GET",
      `/v2/ng/identities/tin/${encodeURIComponent(tin)}`
    );
  }

  /** NUBAN (Regular) — verify account number */
  async verifyNubanRegular(body: NubanRequest) {
    return this.request<BaseIdentityResponse>("POST", `/ng/identities/nuban`, {
      payload: body,
    });
  }

  /** BVN-NUBAN — check with BVN + account number */
  async verifyBvnNuban(payload: NubanRequest) {
    return this.request<object>("POST", `/ng/identities/bvn-nuban`, {
      payload,
    });
  }

  /** Get list of banks for BVN NUBAN, etc. */
  async getBanksForBvnNuban(params?: Record<string, string>) {
    return this.request<object>("GET", `/banks/bvn-nuban`, { params });
  }

  /** Get list of banks for BVN NUBAN, etc. */
  async getBanksForBvnNubanRegular(params?: Record<string, string>) {
    return this.request<object>("GET", `/banks`, { params });
  }

  /** Submit a personal address verification */
  async verifyAddress(payload: ICustomerReference) {
    return this.request<BaseIdentityResponse>("POST", `/addresses`, {
      payload,
    });
  }

  /** Submit a business address verification */
  async verifyBusinessAddress(payload: ICustomerReference) {
    return this.request<BaseIdentityResponse>("POST", `/addresses/business`, {
      payload,
    });
  }

  /** Get address verification result by id (or reference) */
  async getAddressVerification(verificationId: number | string) {
    return this.request<BaseIdentityResponse>(
      "GET",
      `/addresses/${encodeURIComponent(String(verificationId))}`
    );
  }

  async verifyEmployment(payload: EmploymentRequest) {
    return this.request<BaseIdentityResponse>("POST", `/employments`, {
      payload,
    });
  }

  /** Get Employment Verification by ID */
  async getEmploymentById(employmentId: number | string) {
    return this.request<BaseIdentityResponse>(
      "GET",
      `/employments/${encodeURIComponent(String(employmentId))}`
    );
  }

  /** Submit Guarantor Verification */
  async verifyGuarantor(body: GuarantorRequest) {
    return this.request<IVerificationRecord>("POST", `/v1/guarantors`, {
      payload: body,
    });
  }

  /** Get Guarantor Verification by ID */
  async getGuarantorById(guarantorId: number | string) {
    return this.request<IVerificationRecord>(
      "GET",
      `/guarantors/${encodeURIComponent(String(guarantorId))}`
    );
  }

  /** Guarantor Plus Verification (if supported) */
  async verifyGuarantorPlus(body: GuarantorRequest) {
    // If QoreID supports a “+” endpoint, you might use e.g. `/v1/guarantors/plus`
    return this.request<IVerificationRecord>("POST", `/guarantors/plus`, {
      payload: body,
    });
  }

  /** Create property verification (asset) */
  async createPropertyVerification(
    payload: PropertyRequest
  ): Promise<PropertyResponse> {
    return this.request<PropertyResponse>("POST", `/v1/properties`, {
      payload,
    });
  }

  /** Fetch property verification by ID */
  async getPropertyVerification(
    verificationId: number | string
  ): Promise<PropertyResponse> {
    return this.request<PropertyResponse>(
      "GET",
      `/v1/properties/${encodeURIComponent(String(verificationId))}`
    );
  }

  /** Vehicle verification */
  async verifyVehicle(body: VehicleRequest) {
    return this.request<BaseIdentityResponse>("POST", `/v1/vehicles`, {
      payload: body,
    });
  }

  /** License Plate (Basic) verification */
  async verifyLicensePlateBasic(plateNumber: string) {
    return this.request<BaseIdentityResponse>(
      "POST",
      `/v1/ng/identities/license-plate-basic/${encodeURIComponent(plateNumber)}`
    );
  }

  /** License Plate (Premium) verification */
  async verifyLicensePlatePremium(plateNumber: string) {
    return this.request<BaseIdentityResponse>(
      "POST",
      `/v1/ng/identities/license-plate-premium/${encodeURIComponent(
        plateNumber
      )}`
    );
  }

  /** Self-service vehicle verification (if exists) */
  async verifyVehicleSelf(body: VehicleRequest) {
    return this.request<BaseIdentityResponse>("POST", `/v1/vehicles/self`, {
      payload: body,
    });
  }

  /** Fetch all supported countries */
  async getCountries() {
    return this.request<CountriesResponse>("GET", `/countries`);
  }

  /** Fetch states for a given country */
  async getStatesForCountry(
    countryId: number | string
  ) {
    return this.request<StatesResponse>(
      "GET",
      `/countries/${encodeURIComponent(String(countryId))}/states`
    );
  }

  /** Fetch LGAs for a given state and country */
  async getLgasForState(
    countryId: number | string,
    stateId: number | string
  ): Promise<LgasResponse> {
    return this.request<LgasResponse>(
      "GET",
      `/countries/${encodeURIComponent(
        String(countryId)
      )}/states/${encodeURIComponent(String(stateId))}/lgas`
    );
  }
}
