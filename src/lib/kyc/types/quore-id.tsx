import { IPayload } from "../../web3/types/block-radar";

export interface WorkflowData {
  id: number;
  customerReference: string;
  applicant: Applicant;
  status: WorkflowStatus;
  summary: WorkflowSummary;
  liveness_check: boolean;
  identity_matches: boolean;
  face_verification_check: boolean;
  address_check: string;
  property_check: string;
  employment_check: string;
  guarantor_check: string;
  liveness: Record<string, string>;
  nin: INin;
  bvn: IBvn;
  drivers_license: IDriversLicense;
  voters_card: IVotersCard;
  tin: ITin;
  cac: ICac;
  nuban: INuban;
  bvn_nuban: IBvnNuban;
  bvn_match: IBvnMatch;
  license_plate: ILicensePlate;
  face_verification: IFaceVerification;
  errors: IWorkflowError[];
  address: IAddress;
  employment: IEmployment;
  criminalRecord: CriminalRecord;
  employmentDetails: EmploymentDetails;
  employerDetails: EmployerDetails;
  attestator: Attestator;
  guarantor: IGuarantor;
  property: IProperty;
}

export interface Applicant {
  firstname: string;
  lastname: string;
  dob: string;
  phone: string;
  email: string;
}

export interface WorkflowStatus {
  status: string;
  state: string;
}

export interface IFieldMatches {
  firstname: boolean; // Defaults to true
  lastname: boolean; // Defaults to true
  dob: boolean; // Defaults to true
  phoneNumber: boolean; // Defaults to true
  gender: boolean; // Defaults to true
  emailAddress: boolean; // Defaults to true
}

export interface ICheck {
  status: string;
  fieldMatches: IFieldMatches;
}

export interface WorkflowSummary {
  nin_check: ICheck;
  bvn_check: ICheck;
  drivers_license_check: ICheck;
  voters_card_check: ICheck;
}

export interface IResidence {
  address1: string;
  address2: string;
  town: string;
  lga: string;
  state: string;
  status: string;
  signature: string;
}

export interface INextOfKin {
  firstname: string;
  lastname: string;
  middlename: string;
  address1: string;
  address2: string;
  lga: string;
  state: string;
  town: string;
  nspokenlang: string;
  ospokenlang: string;
  parent_lastname: string;
  religion: string;
  residence: IResidence;
}

export interface INin {
  firstname: string;
  lastname: string;
  middlename: string;
  gender: string;
  phone: string;
  birthdate: string;
  nationality: string;
  photo: string;
  nin: string;
  profession: string;
  state_of_origin: string;
  lga_of_origin: string;
  place_of_origin: string;
  title: string;
  marital_status: string;
  height: string;
  email: string;
  employment_status: string;
  birth_state: string;
  birth_country: string;
  next_of_kin: INextOfKin;
}

export interface IBvn {
  bvn: string;
  firstname: string;
  lastname: string;
  middlename: string;
  gender: string;
  phone: string;
  birthdate: string;
  nationality: string;
  photo: string;
  email: string;
  watch_listed: string;
  marital_status: string;
  state_of_residence: string;
  lga_of_residence: string;
  lga_of_origin: string;
  residential_address: string;
  state_of_origin: string;
  enrollment_bank: string;
  enrollment_branch: string;
  nin: string;
  name_on_card: string;
  title: string;
  level_of_account: string;
  phone2: string;
  registration_date: string;
}

export interface ITin {
  tin: string;
  taxpayerName: string;
  cacRegNo: string;
  entityType: string;
  jittin: string;
  taxOffice: string;
  phone: string;
  email: string;
  cac: ICac;
  nuban: INuban;
  bvn_nuban: IBvnNuban;
}

export interface ICac {
  rcNumber: number; // Defaults to 0
  companyName: string;
  companyType: string;
  registrationDate: string;
  branchAddress: string;
  companyEmail: string;
  city: string;
  classification: string;
  headOfficeAddress: string;
  lga: string;
  affiliates: number; // Defaults to 0
  shareCapital: string;
  shareCapitalInWords: string;
  state: string;
  status: string;
}

export interface INuban {
  accountName: string;
  accountNumber: string;
  lastname: string;
  firstname: string;
  middlename: string;
  gender: string;
  accountCurrency: string;
  dob: string;
  accountStatus: string;
  mobileNumber: string;
  bvn: string;
}

export interface IBvnNuban {
  firstname: string;
  middlename: string;
  lastname: string;
  birthdate: string;
  gender: string;
  phone: string;
  bvn: string;
  photo: string;
}

export interface IDriversLicense {
  driversLicense: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  photo: string;
  issued_date: string;
  expiry_date: string;
  state_of_issue: string;
  gender: string;
  middlename: string;
  voters_card: IVotersCard;
}

export interface IVotersCard {
  fullname: string;
  vin: string;
  gender: string;
  occupation: string;
  state: string;
  lga: string;
  pollingUnit: string;
  pollingUnitCode: string;
  timeOfRegistration: string;
  firstName: string;
  lastName: string;
}

export interface IBvnMatch {
  bvn: string;
  fieldMatches: IFieldMatches;
}

export interface IFieldMatches {
  firstname: boolean; // Defaults to true
  lastname: boolean; // Defaults to true
  dob: boolean; // Defaults to true
  phoneNumber: boolean; // Defaults to true
  gender: boolean; // Defaults to true
  emailAddress: boolean; // Defaults to true
}
export interface ILicensePlate {
  plateNumber: string;
  chassisNumber: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleCategory: string;
  ownerFirstname: string;
  ownerMiddlename: string;
  ownerLastname: string;
  ownerAddress: string;
  ownerLga: string;
  ownerState: string;
  ownerPhone: string;
  face_verification: IFaceVerification;
}

export interface IFaceVerification {
  id_type: string;
  id_number: string;
  firstname: string;
  lastname: string;
  middlename: string;
  gender: string;
  phone: string;
  birthdate: string;
  photo: string;
  face_verification: IFaceVerificationResult;
}

export interface IFaceVerificationResult {
  match: string;
  match_score: string;
  matching_threshold: string;
  max_score: string;
  errors: IVerificationError[];
}

export interface IVerificationError {
  stepNumber: number; // Defaults to 0
  errorMessage: string;
}

export interface IWorkflowError {
  stepNumber: number; // Defaults to 0
  errorMessage: string;
}

export interface IAddress {
  id: number; // Defaults to 0
  customerReference: string;
  addressBasic: AddressBasic;
  location: Location;
  interiorPhotos: InteriorPhotos;
  exteriorPhotos: ExteriorPhotos;
  neighbor: Neighbor;
  business: Business;
  applicant: Applicant;
  status: Status;
}

export interface AddressBasic {
  addressType: string;
}

export interface Location {
  street: string;
  city: string;
  lgaName: string;
  landmark: string;
  latitude: number; // Defaults to 0
  longitude: number; // Defaults to 0
  initialLatitude: number; // Defaults to 0
  initialLongitude: number; // Defaults to 0
}

export interface InteriorPhotos {
  photo1: string;
  photo2: string;
  photo3: string;
  photo4: string;
  photo5: string;
  photo6: string;
}

export interface ExteriorPhotos {
  exteriorPhoto1: string;
  exteriorPhoto2: string;
  exteriorPhoto3: string;
  exteriorPhoto4: string;
  exteriorPhoto5: string;
  exteriorPhoto6: string;
}

export interface Neighbor {
  firstname: string;
  lastname: string;
  phone: string;
  comment: string;
}

export interface Business {
  id: string;
  nameFound: string;
  area: string;
  canContactPoc: boolean; // Defaults to true
  rcNumber: string;
  businessType: string;
  businessName: string;
}

export interface Applicant {
  id: number; // Defaults to 0
  firstname: string;
  middlename: string;
  lastname: string;
  gender: string;
  maritalStatus: string;
  phone: string;
  email: string;
  dob: string;
  photo: string;
}

export interface Status {
  status: string;
  state: string;
}
export interface IEmployment {
  id: number; // Defaults to 0
  verificationTypeCode: string;
  isAsset: boolean; // Defaults to true
  organisationId: number; // Defaults to 0
  userId: number; // Defaults to 0
  approvedAt: string;
  requestedAt: string;
  requestSource: string;
  consentReference: string;
  archived: boolean; // Defaults to true
  canContactPoc: boolean; // Defaults to true
  apiReference: string;
  bundleCode: string;
  stateId: number; // Defaults to 0
  lgaId: number; // Defaults to 0
  latitude: number; // Defaults to 0
  longitude: number; // Defaults to 0
  isVague: boolean; // Defaults to true
  customerReference: string;
  paymentMethodCode: string;

  criminalRecord: CriminalRecord;
  employmentDetails: EmploymentDetails;
  employerDetails: EmployerDetails;
  status: EmploymentStatus;
  applicant: EmploymentApplicant;
}

export interface CriminalRecord {
  policeReportNumber: string;
  policeReport: string;
  policeStationAddress: string;
  offence: string;
}

export interface EmploymentDetails {
  startDate: string;
  endDate: string;
  jobTitle: string;
  rehire: boolean; // Defaults to true
  currentlyEmployed: boolean; // Defaults to true
  employeeDepartment: string;
  employmentType: string;
  supervisorName: string;
  supervisorTitle: string;
  supervisorPhone: string;
  supervisorEmail: string;
  jobLeaveReason: string;
  jobBenefits: string;
  compensationRate: string;
  salaryRange: string;
  averageHours: number; // Defaults to 0
  jobTermination: string;
  employerConsented: boolean; // Defaults to true
}

export interface EmployerDetails {
  name: string;
  phone: string;
  email: string;
  companyCac: string;
  contactPersonName: string;
  industry: string;
  companyAddress: string;
  companySize: string;
  attestator: Attestator;
}

export interface Attestator {
  name: string;
  title: string;
  phone: string;
  email: string;
}

export interface EmploymentStatus {
  status: string;
  subStatus: string;
  state: string;
}

export interface EmploymentApplicant {
  id: number; // Defaults to 0
  firstname: string;
  middlename: string;
  lastname: string;
  gender: string;
  maritalStatus: string;
  phone: string;
  email: string;
  dob: string;
  photo: string;
}

export interface IGuarantor {
  status: string;
  subStatus: string;
  state: string;

  guarantorDetail: IGuarantorDetail;

  // These fields are directly under guarantor (NOT under guarantorDetail)
  id: number; // Defaults to 0
  verificationTypeCode: string;
  organisationId: number; // Defaults to 0
  userId: number; // Defaults to 0
  approvedAt: string;
  requestedAt: string;
  consentReference: string;
  requestSource: string;
  archived: boolean; // Defaults to true
  canContactPoc: boolean; // Defaults to true
  apiReference: string;
  stateId: number; // Defaults to 0
  lgaId: number; // Defaults to 0
  customerReference: string;
  paymentMethodCode: string;

  applicant: IGuarantorApplicant;
}

export interface IGuarantorDetail {
  guarantorId: number; // Defaults to 0
  addressId: number; // Defaults to 0
  availableForContact: boolean; // Defaults to true
  guarantorIdentity: IGuarantorIdentity;
  guarantorVerification: IGuarantorVerification;
  guarantorRelationship: IGuarantorRelationship;
}

export interface IGuarantorIdentity {
  identity: string;
  identityType: string;
  permissibleIdentityType: string;
  identityPhoto: string;
}

export interface IGuarantorVerification {
  comment: string;
  deviceFingerprint: string;
  viewedAt: string;
  verifyAddress: boolean; // Defaults to true
}

export interface IGuarantorRelationship {
  relationshipType: string;
  relationshipLength: string;
}

export interface IGuarantorApplicant {
  id: number; // Defaults to 0
  firstname: string;
  middlename: string;
  lastname: string;
  gender: string;
  maritalStatus: string;
  phone: string;
  email: string;
  dob: string;
  photo: string;
}

export interface IProperty {
  id: number; // Defaults to 0
  verificationTypeCode: string;
  requestValue: string;
  isAsset: boolean; // Defaults to true
  organisationId: number; // Defaults to 0
  userId: number; // Defaults to 0
  approvedAt: string;
  requestedAt: string;
  consentReference: string;
  requestSource: string;
  archived: boolean; // Defaults to true
  canContactPoc: boolean; // Defaults to true
  apiReference: string;
  stateId: number; // Defaults to 0
  stateName: string;
  lgaId: number; // Defaults to 0
  lgaName: string;
  latitude: number; // Defaults to 0
  longitude: number; // Defaults to 0
  isVague: boolean; // Defaults to true
  customerReference: string;
  paymentMethodCode: string;

  applicant: IPropertyApplicant;
  propertyBasic: IPropertyBasic;
  exteriorPhotos: IExteriorPhotos;
  interiorPhotos: IInteriorPhotos;
  propertyCriterial: IPropertyCriterial;
  propertyUtilities: IPropertyUtilities;
  propertyLocation: IPropertyLocation;
  propertyConfirmation: IPropertyConfirmation;
  propertyAesthestic: IPropertyAesthestic;
  status: IPropertyStatus;
}

// ------------------- Nested Interfaces -------------------

export interface IPropertyApplicant {
  id: number; // Defaults to 0
  firstname: string;
  middlename: string;
  lastname: string;
  gender: string;
  maritalStatus: string;
  phone: string;
  email: string;
  dob: string;
  photo: string;
}

export interface IPropertyBasic {
  propertyType: string;
  propertyName: string;
  propertyCost: number; // Defaults to 0
  scheduleDate: string;
  propertyPhoto1: string;
  propertyPhoto2: string;
  propertyPhoto3: string;
  propertyPhoto4: string;
  propertyPhoto5: string;
  propertyPhoto6: string;
}

export interface IExteriorPhotos {
  exteriorPhoto1: string;
  exteriorPhoto2: string;
  exteriorPhoto3: string;
  exteriorPhoto4: string;
  exteriorPhoto5: string;
  exteriorPhoto6: string;
}

export interface IInteriorPhotos {
  exteriorPhoto1: string;
  exteriorPhoto2: string;
  exteriorPhoto3: string;
  exteriorPhoto4: string;
  exteriorPhoto5: string;
  exteriorPhoto6: string;
}

export interface IPropertyCriterial {
  hasEmergencyExit: boolean; // Defaults to true
  hasWindowsBurglaryProof: boolean; // Defaults to true
  hasDoorsBurglaryProof: boolean; // Defaults to true
  areElectricWiresExposed: boolean; // Defaults to true
  additionalSafetyComment: string;
}

export interface IPropertyUtilities {
  tapsRunWell: boolean; // Defaults to true
  hasCableTv: boolean; // Defaults to true
  hasStandbyGenerator: boolean; // Defaults to true
  hasKitchen: boolean; // Defaults to true
  hasMicrowave: boolean; // Defaults to true
  hasElectricKettle: boolean; // Defaults to true
  hasCookingStove: boolean; // Defaults to true
  hasPlatesAndCups: boolean; // Defaults to true
  hasCutlery: boolean; // Defaults to true
  additionalUtilitiesComment: string;
}

export interface IPropertyLocation {
  hasTarredRoad: boolean; // Defaults to true
  hasParkingSpace: boolean; // Defaults to true
  availableCarSpace: number; // Defaults to 0
  commentAboutLocation: string;
  street: string;
  city: string;
  latitude: number; // Defaults to 0
  longitude: number; // Defaults to 0
  hostLivesHere: boolean; // Defaults to true
  numberOfTenants: number; // Defaults to 0
}

export interface IPropertyConfirmation {
  numberOfBedrooms: number; // Defaults to 0
  numberOfBathrooms: number; // Defaults to 0
  hasClothStorageFurniture: boolean; // Defaults to true
  isSmokingAllowed: boolean; // Defaults to true
  areEventsAllowed: boolean; // Defaults to true
  areChildrenAllowed: boolean; // Defaults to true
  arePetsAllowed: boolean; // Defaults to true
  hasDryer: boolean; // Defaults to true
  hasLift: boolean; // Defaults to true
  hasHotWater: boolean; // Defaults to true
  hasTV: boolean; // Defaults to true
  hasAirConditioning: boolean; // Defaults to true
  hasFirstAidKit: boolean; // Defaults to true
  hasWashingMachine: boolean; // Defaults to true
  hasToiletries: boolean; // Defaults to true
  hasWiFi: boolean; // Defaults to true
  hasBunker: boolean; // Defaults to true
  hasSmokeDetector: boolean; // Defaults to true
  hasFireExtinguisher: boolean; // Defaults to true
  hasBreakfast: boolean; // Defaults to true
  hasTowel: boolean; // Defaults to true
  hasBedsheets: boolean; // Defaults to true
}

export interface IPropertyAesthestic {
  hasMarksAndStains: boolean; // Defaults to true
  marksAndStainsRating: number; // Defaults to 0
  hasMinimumOfTwoSittingRoomWindows: boolean; // Defaults to true
  hasMinimumOfTwoBedRoomWindows: boolean; // Defaults to true
  additionalComments: string;
}

export interface IPropertyStatus {
  status: string;
  subStatus: string;
  state: string;
}

// ===============================
// Applicant Interfaces
// ===============================

export interface Applicant {
  createdAt: string;
  updatedAt: string;
  id: number; // Defaults to 0
  organisationId: number; // Defaults to 0
  customerReference: string;
  firstname: string;
  middlename: string;
  lastname: string;
  phone: string;
  dob: string;
  flowRequestMetadata: FlowRequestMetadata;
  verifications: Verification[];
}

export interface FlowRequestMetadata {
  id: number; // Defaults to 0
  flowId: number; // Defaults to 0
  reportType: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  countryCode: string;
}

export interface Verification {
  metadata: VerificationMetadata;
  product: VerificationProduct;
}

export interface VerificationMetadata {
  name: string;
  stepNumber: number; // Defaults to 0
  serviceCode: string;
  status: string;
  submittedAt: string;
  price: number; // Defaults to 0
}

export interface VerificationProduct {
  data: VerificationProductData;
  location: Location;
  applicant: ApplicantProduct;
  price: number; // Defaults to 0
  verifindReport: VerifindReport;
}

export interface VerificationProductData {
  id: number; // Defaults to 0
  verificationTypeCode: string;
  organisationId: number; // Defaults to 0
  requestedAt: string;
  identityVerificationId: number; // Defaults to 0
  requestSource: string;
  stateId: number; // Defaults to 0
  stateName: string;
  lgaId: number; // Defaults to 0
  lgaName: string;
  countryName: string;
  isLive: boolean; // Defaults to true
}

export interface Location {
  addressBasic: AddressBasic;
  customerReference: string;
}

export interface AddressBasic {
  addressType: string;
  isVague: boolean; // Defaults to true
}

export interface ApplicantProduct {
  // Applicant as seen inside Verification.product.applicant
  id: number; // Defaults to 0
  firstname: string;
  middlename: string;
  lastname: string;
  gender?: string; // Optional since not in this subset, but exists globally
  maritalStatus?: string;
  phone: string;
  email?: string;
  dob: string;
  photo?: string;
}

export interface VerifindReport {
  status: Status; // Reuses the `Status` interface we already defined
}

export interface IReport {
  applicant: Applicant;
  guarantor: IGuarantor;
  property: IProperty;
  fieldMatches: IFieldMatches;
  face_verification: IFaceVerification;
  license_plate: ILicensePlate;
  errors: IWorkflowError[];
}

export interface BaseIdentityResponse {
  id: number;
  customerReference?: string;
  status: {
    status: string;
    state: string;
  };
  summary?: {
    [key: string]: unknown; // e.g. checks summary keys like nin_check, drivers_license_check, etc.
  };
  applicant?: Applicant;
  // The actual identity object, e.g. nin, drivers_license, bvn, etc:
  nin?: INin;
  drivers_license?: IDriversLicense;
  bvn?: IBvn;
  voters_card: IVotersCard;
  cac?: ICac;
  tin?: ITin;
  nuban?: INuban;
  employment?: IEmployment;
  property?: IProperty;
  license_plate?: ILicensePlate;

  address?: IAddress;
  duplicateRequest?: boolean;
  // more fields as needed...
}

export interface IPerson extends IPayload {
  firstname: string; // required, default: "Bunch"
  lastname: string; // required, default: "Dillon"
  dob: string; // date in format YYYY-MM-DD
  phone?: string; // optional
  email?: string; // optional
  gender?: string; // optional
}

export interface IBvnResponse {
  bvn: string;
  consentUrl: string;
  consentStatus: boolean;
}

export interface IIdentificationBase extends IPayload {
  idNumber: string; // required
}

export type IIdentification =
  | (IIdentificationBase & {
      photoBase64: string;
      photoUrl?: never;
      photo?: never;
    })
  | (IIdentificationBase & {
      photoUrl: string;
      photoBase64?: never;
      photo?: never;
    })
  | (IIdentificationBase & {
      photo: File;
      photoBase64?: never;
      photoUrl?: never;
    });

// qoreid/types.ts

export interface FaceVerificationResponse {
  id: number;
  status: {
    status: string;
    state: string;
  };
  face_verification: IFaceVerification;
}

export interface NubanRequest extends IPayload {
  firstname: string;
  lastname: string;
  accountNumber: string;
  bankCode: string;
  dob?: string;
  phone?: string;
  gender?: string;
}

export interface IApplicant extends IPayload {
  firstname: string; // required - Applicant first name
  lastname: string; // required - Applicant last name
  phone: string; // required - Applicant phone
  dob?: string; // optional - Applicant date of birth
  idType?: "nin" | "bvn" | "drivers_license"; // optional enum
  idNumber?: string; // optional - Applicant Identity Number
  gender?: string; // optional - Applicant Gender
}

export interface ICustomerReference extends IPayload {
  customerReference: string; // required - Customer reference
  street: string; // required - Street to be verified
  lgaName: string; // required - Local govt area name
  stateName: string; // required - State
  landmark?: string; // optional - Address landmark
  city: string; // required - Address city
  applicant: IApplicant; // nested object
}

export interface ICustomerReference extends IPayload {
  customerReference: string; // required - Customer Reference
  street: string; // required - Street Name
  stateName: string; // required - State Name
  lgaName: string; // required - Lga Name of Address
  city: string; // required - City
  landmark?: string; // optional - Landmark
  applicant: IApplicant; // required - Nested Applicant Object
  canContactPoc: boolean; // required - Can reach out to Contact Person
  rcNumber: string; // required - Registered Number
  businessType: "Formal" | "Informal"; // required - Business Type
  businessName: string; // required - Registered Business Name
}

export interface IGuarantorVerification {
  verifyAddress: boolean; // default: true
}

export interface IGuarantorIdentity {
  permissibleIdentityType: string;
}

export interface IGuarantorDetail {
  guarantorId: number; // default: 0
  guarantorIdentity: IGuarantorIdentity;
  guarantorVerification: IGuarantorVerification;
}

export interface IStatus {
  status: string;
  subStatus: string;
  state: string;
}

export interface IVerificationRecord {
  id: number; // default: 0
  customerReference: string;
  applicant: IApplicant;
  status: IStatus;
  verificationTypeCode: string;
  organisationId: number; // default: 0
  requestedAt: string;
  consentReference?: string;
  requestSource?: string;
  archived: boolean; // default: true
  canContactPoc: boolean; // default: true
  paymentMethodCode?: string;
  guarantorDetail: IGuarantorDetail;
  price: number; // default: 0
  updatedAt: string;
}

export interface EmploymentRequest extends IPayload {
  customerReference: string;
  employerName: string;
  employerEmail: string;
  employerPhone: string;
  startDate?: string; // optional, as date string
  endDate?: string;
  jobTitle?: string;
  currentlyEmployed?: boolean;
  contactPersonName?: string;
  applicant: {
    firstname: string;
    lastname: string;
    dob?: string;
    phone: string;
    idNumber?: string; // optional, e.g. NIN/BVN/etc
  };
}

export interface GuarantorRequest extends IPayload {
  customerReference: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  street?: string;
  lgaName?: string;
  landmark?: string;
  acceptableIdType: string[]; // e.g. ["nin", "drivers_license"]
  applicant: {
    firstname: string;
    lastname: string;
    phone: string;
    dob?: string;
    idType?: string;
    idNumber?: string;
  };
}

export interface PropertyRequest extends IPayload {
  customerReference: string;
  propertyName: string;
  propertyType: string;
  lgaName: string;
  address: string;
  contactPerson: {
    firstname: string;
    lastname: string;
    phone: string;
    email?: string;
  };
}

export interface PropertyResponse {
  id: number;
  customerReference?: string;
  applicant?: {
    firstname: string;
    lastname: string;
    phone: string;
    email?: string;
  };
  status: {
    status: string;
    subStatus?: string;
    state: string;
  };
  property: {
    id: number;
    verificationTypeCode?: string;
    requestValue?: string;
    isAsset?: boolean;
    organisationId?: number;
    requestedAt?: string;
    stateName?: string;
    lgaName?: string;
    latitude?: number;
    longitude?: number;
    propertyBasic?: {
      propertyName: string;
      propertyType: string;
    };
    propertyLocation?: {
      street: string;
    };
    // and other nested fields per the docs
  };
}

// Vehicle / License Plate

export interface VehicleRequest extends IPayload {
  requestSource: string;
  customerReference: string;
  lgaName: string;
  stateName: string;
  street?: string;
  landmark?: string;
  engineNo: string;
  chasisNo: string;
  mileage: string;
  windscreenCracks: string;
  sideMirrorCracks: string;
  overallCondition: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleColor: string;
  registrationNumber: string;
  driverFrontSidePhoto: string;
  passengerRearSidePhoto: string;
  frontInnerPhoto: string;
  speedometerPhoto: string;
  engineCompartmentPhoto: string;
  informationPanelPhoto: string;
}

export interface VehicleResponse {
  id: number;
  customerReference?: string;
  applicant?: {
    firstname: string;
    lastname: string;
    phone?: string;
    email?: string;
  };
  status: {
    status: string;
    subStatus?: string;
    state: string;
  };
  vehicle: {
    id: number;
    vehicleBasic?: {
      vehicleMake: string;
      vehicleModel: string;
      vehicleYear: string;
      vehicleColor: string;
      registrationNumber: string;
    };
    stateName?: string;
    lgaName?: string;
    customerReference?: string;
    location?: string;
    // etc
  };
}

// License Plate (Basic / Premium)

export interface LicensePlateResponse {
  id: number;
  customerReference?: string;
  status: {
    status: string;
    subStatus?: string;
    state: string;
  };
  applicant?: {
    firstname?: string;
    lastname?: string;
    phone?: string;
    email?: string;
  };
  licensePlate?: {
    plateNumber: string;
    // maybe metadata like region, registration, etc.
  };
}


export interface Country {
  id: number;
  name: string;
  code: string; // e.g. “NG”
}

export interface State {
  id: number;
  name: string;
  code?: string;
  countryId: number;
}

export interface Lga {
  id: number;
  name: string;
  stateId: number;
  countryId: number;
}

export interface CountriesResponse {
  countries: Country[];
}

export interface StatesResponse {
  states: State[];
}

export interface LgasResponse {
  lgas: Lga[];
}
