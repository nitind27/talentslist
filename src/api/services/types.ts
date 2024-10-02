export interface ITravelData {
    status:  boolean;
    message: string;
    data:    string;
}

export interface IPlatform {
    status:  boolean;
    message: string;
    data:    IPlatformData[];
}

export interface IPlatformData {
    title:       string;
    platform_id: number;
    checked:     boolean;
    image:       string;
}


export interface ICancellation {
    status:  boolean;
    message: string;
    data:    ICancellationData;
}

export interface ICancellationData {
  id: number;
  user_id: number;
  cancel_before_type: string | null;
  cancel_before_value: number | null;
  cancel_fees_type: string | null;
  cancel_fees_value: number | null;
  created_at: Date;
  updated_at: Date;
  free_cancellation: boolean;
}


export interface IAvailability {
    status:  boolean;
    message: string;
    data:    IAvailabilityData;
}

export interface IAvailabilityData {
    booking:           string | number;
    available:         string;
    period:            number;
    booking_duration:  number;
    days:              string[];
    availability_slot: AvailabilitySlot;
    expired_at: string;

}

export interface AvailabilitySlot {
    Monday:    Day[];
    Tuesday:   Day[];
    Wednesday: Day[];
    Thursday:  Day[];
    Friday:    Day[];
    Saturday:  Day[];
    Sunday:    Day[];
}

export interface Day {
    start_time: string;
    end_time:   string;
}

export interface IEditAvailability {
    status:  boolean;
    message: string;
    data:    Data;
}

export interface Data {
    availability: Availability;
}

export interface Availability {
    id:                number;
    user_id:           number;
    is_available:      string;
    availability:      string;
    availability_slot: string;
    booking_duration:  number;
    expired_at:        Date;
    created_at:        Date;
    updated_at:        Date;
}

export interface IDeleteServices {
    status:  boolean;
    message: string;
}
export interface IActiveInactiveServices {
    status:  boolean;
    message: string;
}

export interface IServices {
    status:  boolean;
    message: string;
    data:    IServiceData;
}

export interface IServiceData {
    parent_skill:    ParentSkillElement[];
    talent_packages: TalentPackages;
}

export interface ParentSkillElement {
    id:         number;
    name:       string;
    parent_id:  string;
    status:     string;
    popular:    number;
    allow_band: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    is_special: number;
    title:      null;
    user_id:    number;
}

export interface TalentPackages {
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
    id:                    number;
    user_id:               number;
    title:                 string;
    includes:              null;
    excludes:              null;
    price:                 number;
    price_to:              null;
    order:                 number;
    duration:              string;
    product:               string;
    sku:                   string;
    discount:              number | null;
    discount_from:         Date | null;
    discount_to:           Date | null;
    enabled:               string;
    cancel_fees_value:     null;
    cancel_fees_type:      null;
    cancel_before_value:   null;
    cancel_before_type:    null;
    type:                  string;
    advanced_payment:      number | null;
    advanced_payment_type: null | string;
    booking_duration:      number;
    online_platforms:      null;
    fees_by:               string;
    created_at:            Date;
    updated_at:            Date;
    deleted_at:            null;
    skills:                TalentPackageSkill[];
}

export interface TalentPackageSkill {
    id:         number;
    package_id: number;
    skill_id:   number;
    parent:     string;
    created_at: Date;
    updated_at: Date;
    skill:      ParentSkillElement;
}

export interface Link {
    url:    null | string;
    label:  string;
    active: boolean;
}

export interface IServiceID {
    status:  boolean;
    message: string;
    data:    IServiceIdData[];
}

export interface IServiceIdData {
    title:                 string;
    price:                 number ;
    duration:              string;
    discount:              number ;
    discount_from:         string | null;
    discount_to:           string | null;  
    type:                  string;
    advanced_payment:      number | string;
    offering:               { [key: string]: string }
    require:               { [key: string]: string };
    promote:               number | string |  boolean  ;
    parent_skills_id:     number [] | string;
    child_skills_ids:      number[] | string[];
    [key: string]: any;
    
}


export interface IParentsSkills {
    status:  boolean;
    message: string;
    data:    IParentsSkillsData[];
}

export interface IParentsSkillsData {
    id:         number;
    name:       string;
    parent_id:  null | string;
    status:     string;
    catimage:   null | string;
    popular:    number;
    allow_band: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    is_special: number;
    title:      null | string;
    user_id:    number;
}


