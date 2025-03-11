export interface IntegrityHash {
  hash: string
  type: string
}

export interface MediaContent {
  contentType: string
  integrity?: IntegrityHash
  uri: string
}

export interface Medias {
  gallery?: MediaContent
  hero?: MediaContent
  product?: MediaContent
  square?: MediaContent
}

export interface ResourceValue {
  contentType: string
  integrity?: IntegrityHash
  uri: string
}

export interface Resource {
  key: string
  value: ResourceValue
}

export interface AttributeDescriptor {
  description: string
  dynamic: boolean
  name: string
  type: string
}

export interface Attribute {
  key: string
  value: AttributeDescriptor
}

export interface DynamicResource {
  contentType: string
  uris: string[]
}

export interface MetadataContent {
  attributes?: Attribute[]
  description: string
  dynamicAttributes?: DynamicResource[]
  dynamicResources?: {key: string; value: DynamicResource}[]
  medias: Medias
  name: string
  properties?: Record<string, unknown>
  resources?: Resource[]
  subName?: string
}

export interface Metadata {
  cachedSource?: MediaContent
  content: MetadataContent
  locked?: boolean
  source?: MediaContent
  status: string
}

export interface TimeWindow {
  endDate: string
  startDate: string
}

export interface Currency {
  code: string
  symbol: string
}

export interface Price {
  amount: string
  currency: Currency
}

export interface ResaleShare {
  basisPoints: number
  receiver: string
}

export interface Resale {
  minimumPrice: Price
  shares: ResaleShare[]
}

export interface Stock {
  authorized: number
  existing: number
  maxMintable: number
  mintable: number
  minted: number
}

export interface Factory {
  accountMintingLimit: number
  assetCreator: string
  assetManager: string
  conditionlessReceivers: string[]
  defaultUniqMetadata: Metadata
  id: string
  metadata: Metadata
  mintableWindow: TimeWindow
  resale: Resale
  status: string
  stock: Stock
  tradingWindow: TimeWindow
  transferWindow: TimeWindow
  type: string
}

export interface FactoryResponse {
  uniqFactory: Factory
}

export interface FactoryVars {
  id: string
}

export interface AuthResponse {
  access_token: string
  expires_in: number
  refresh_expires_in: number
  refresh_token: string
  token_type: string
  scope: string
}