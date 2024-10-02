export interface IPayment {
    status:  boolean;
    message: string;
    data:    IEaringData;
}

export interface IEaringData {
    payment_threshold:   string;
    earnings:            string;
    earnings_percentage: string;

}

// export interface ITransactionData {
//     status:  boolean;
//     message: string;
//     data:    ITransaction[];
// }

// export interface ITransaction {
//     month:       string;
//     description: string;
//     amount:      string;
// }

export interface ITransactionData {
    status:  boolean;
    message: string;
    data:    ITransaction;
}

export interface ITransaction {
    [x: string]: any;
    current_page:   number;
    data:           Datum[];
    first_page_url: string;
    from:           number;
    last_page:      number;
    last_page_url:  string;
    links:          Link[];
    next_page_url:  string;
    path:           string;
    per_page:       number;
    prev_page_url:  null;
    to:             number;
    total:          number;
}

export interface Datum {
    amount:          string;
    description:     null | string;
    formatted_month: string;
}

export interface Link {
    url:    null | string;
    label:  string;
    active: boolean;
}






export interface Client {
    id:                    number;
    ip_address:            string;
    username:              null;
    email:                 string;
    available_balance:     string;
    activation_code:       string;
    created_on:            number;
    last_login:            Date;
    active:                number;
    reason_to_close:       null;
    first_name:            string;
    last_name:             string;
    progress:              string;
    company:               null;
    phone:                 string;
    phone_country_code:    string;
    verified_phone_at:     Date;
    code:                  null;
    birth_date:            null;
    birth_place:           null;
    country:               null;
    nationality:           null;
    address:               string;
    address_datails:       null;
    state:                 null;
    city:                  string;
    postcode:              string;
    gender:                null;
    paypal:                null;
    preapprovalKey:        null;
    preapprovalkey_status: null;
    billing_agreement_id:  null;
    online:                number;
    referral_earning:      string;
    time_zone:             string;
    created_at:            Date;
    updated_at:            Date;
    deleted_at:            null;
    otp_code:              null;
    google_token_time:     null;
    google_response_data:  null;
    outlook_token_time:    null;
    outlook_response_data: null;
    allow_google_sync:     string;
    allow_outlook_sync:    string;
    otp_expire:            null;
    google_calendar_id:    null;
    outlook_calendar_id:   null;
    notification_enabled:  number;
    country_code:          string;
    active_talents_pay:    string;
    marital_status_id:     null;
    first_time:            number;
    last_delete_date:      null;
    client_profile_image:  string;
    user_groups:           UserGroup[];
}

export interface UserGroup {
    id:       number;
    user_id:  number;
    group_id: number;
}

export interface TalentPackages {
    id:                    number;
    user_id:               number;
    title:                 string;
    includes:              null;
    excludes:              null;
    price:                 number;
    price_type:            string;
    price_to:              null;
    order:                 number;
    duration:              string;
    product:               string;
    sku:                   string;
    discount:              null;
    discount_from:         null;
    discount_to:           null;
    enabled:               string;
    cancel_fees_value:     null;
    cancel_fees_type:      null;
    cancel_before_value:   null;
    cancel_before_type:    null;
    type:                  string;
    advanced_payment:      number;
    advanced_payment_type: string;
    booking_duration:      number;
    online_platforms:      null;
    fees_by:               string;
    created_at:            Date;
    updated_at:            Date;
    deleted_at:            null;
}

export interface Withdraw {
    id:                     number;
    user_id:                number;
    user_payment_method_id: number;
    withdrawal_code:        string;
    currency:               string;
    amount:                 string;
    fees:                   string;
    sub_total:              string;
    rate:                   string;
    amount_will_get:        string;
    quote_id:               string;
    transfer_id:            number;
    transaction_id:         number;
    action_at:              Date;
    remarks:                null;
    status:                 string;
    created_at:             Date;
    updated_at:             Date;
}

export interface Link {
    url:    null | string;
    label:  string;
    active: boolean;
}


export interface ICurrency {
    status:  boolean;
    message: string;
    data:    currencyData;
}

export interface currencyData {
    form:     BankForm[];
    currency: string;
}

export interface BankForm {
    type:      string;
    title:     string;
    usageInfo: null;
    fields:    Field[];
}

export interface Field {
    name:  string;
    group: Group[];
}

export interface Group {
    key:                         string;
    name:                        string;
    type:                        string;
    refreshRequirementsOnChange: boolean;
    required:                    boolean;
    displayFormat:               null;
    example:                     string;
    minLength:                   number | null;
    maxLength:                   number | null;
    validationRegexp:            null | string;
    validationAsync:             null;
    valuesAllowed:               ValuesAllowed[] | null;
}



export interface ValuesAllowed {
    key:  string;
    name: string;
}

export interface BankBranchName {
    status:  boolean;
    message: string;
    data:    { [key: string]: string };
}


export interface CHftypes {
    currency:            string;
    account_holder_name: string;
    legal_type:          string;
    address:             string;
    location:            string;
    postcode:            string;
    form_fields:         FormFields;
}

export interface FormFields {
    iban: Iban[];
    aba:           Iban[];
    fedwire_local: Iban[];
    swift_code:    Iban[];
    emirates:      Iban[];
    sort_code:      Iban[]; 
    canadian:      Iban[]; 
    interac:      Iban[]; 
    turkish_earthport:  Iban[]; 
    japanese    :Iban[]; 
}

export interface Iban {
    type:        string;
    key:         string;
    value:       string;
    is_required: number;
}




export interface IPaymentMethod {
    status:  boolean;
    message: string;
    data:    Details;
}

export interface Details {
    account_holder_name: string;
    currency:            string;
    form_data: {
        details:Detailsinfo;
    }         
}


export interface Detailsinfo {
    sortCode:      string;
    legalType:     string;
    accountNumber: string;
    BIC         :string;
    IBAN        :string;
    swiftCode   :string;
    dateOfBirth :string;
    nationality :string;
    interacAccount:string;
    bankCode:string;
    branchCode:string;
    accountType:string;
    account_holder_name:string;
    currency:string;
}

export interface CurrencyFieldMapping  {
  [key: string]: { label: string; key: string }[];
};
export interface DeleteBankAccounttype {
    status:  boolean;
    message: string;
}

export interface TransferRate {
    success: boolean;
    message: string;
    data:    Data;
}

export interface Data {
    fees_amount:  number;
    convert:      number;
    rate:         number;
    targetAmount: number;
    currency:     string;
    quote_id:     string;
}
export interface AddWithdraw{
    success: boolean;
    message: string;
}