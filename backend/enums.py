# This ensures that user responses have to be from a set of valid answers
from enum import Enum

class AgeOptions(str, Enum):
    age_under18 = "Under 18"
    age_18to24 = "18–24"
    age_25to34 = "25–34"
    age_35to44 = "35–44"
    age_45to54 = "45–54"
    age_55to64 = "55–64"
    age_over65 = "65 or older"
    age_noans = "Prefer not to answer"

class SexualityOptions(str, Enum):
    sexuality_asexual = "Asexual"
    sexuality_bisexual = "Bisexual"
    sexuality_gayorlesbian = "Gay or Lesbian"
    sexuality_heterosexual = "Heterosexual / Straight"
    sexuality_pansexual = "Pansexual"
    sexuality_noans = "Prefer not to answer"

class GenderOptions(str, Enum):
    gender_male = "Male"
    gender_female = "Female"
    gender_nonbinary = "Nonbinary / Gender diverse"
    gender_noans = "Prefer not to answer"

class TransgenderOptions(str, Enum):
    transgender_yes = "Yes"
    transgender_no = "No"
    transgender_noans = "Prefer not to answer"
