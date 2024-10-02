// Define the interface
export interface ListsWidgetProps {
  cardClasses?: string;
  headerClasses?: string;
  titleClasses?: string;
  iconClasses?: string;
  icon?: string;
  buttonClasses?: string;
  separatorClasses?: string;
  contentClasses?: string;
  title: string;
  content?: string;
  country: string;
  citizenship?: string;
  city: string;
  availableToTravel: string;
  location?: string;
  preferred_countries: {
    countryName: string;
    id: number;
  }[];
}

export interface ListsprfileinfoProps {
  firstName: string;
  lastName: string;
  stageName: string;
  stageNameVisibility: string;
  username: string;
  gender: string;
  birthDate: string;
  content: string;
  languages: string[];
}

export interface ListsAppearanceProps {
  height: string;
  weight: string;
  chest: string;
  ethnicity: string;
  skincolor: string;
  eyecolor: string;
  waist: string;
  hairtype: string;
  haircolor: string;
  hairlength: string;
  appearancedatas:any;
  shoesize: string;
}
export interface ListsLanguagesProps {
  languages: any;
}

export interface ListsEducationProps {
  degree: string;
  country: string;
  period: string;
}

export interface ListsSkillsProps {
  skills: string;
}
export interface ListsExperience {
  companyName: string;
  location: string;
  period: string;
}

export interface ListsWidget8Props {
  languages: string[];
}

export interface SocialMediaProps {
  facebook: string;
  instagram: string;
  linkdin: string;
  youtube: string;
}
