export interface Community {
  [key: string]: string;
}

export const provinces: Community = {
  "ontario":"ON",
  "quebec":"QC",
  "nova scotia":"NS",
  "new brunswick":"NB",
  "manitoba":"MB",
  "british columbia":"BC",
  "prince edward island":"PE",
  "saskatchewan":"SK",
  "alberta":"AB",
  "newfoundland and labrador":"NL"
};

export const territories: Community = {
  "northwest territories": "NT",
  "yukon": "YT",
  "nunavut": "NU"
};

export const rightNames: Community = {
  "ON": "Ontario",
  "QC": "Quebec",
  "NS": "Nova Scotia",
  "NB": "New Brunswick",
  "MB": "Manitoba",
  "BC": "British Columbia",
  "PE": "Prince Edward Island",
  "SK": "Saskatchewan",
  "AB": "Alberta",
  "NL": "Newfoundland and Labrador",
  "NT": "Northwest Territories",
  "YT": "Yukon",
  "NU": "Nunavut"
  }