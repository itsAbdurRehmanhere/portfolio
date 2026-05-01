import re
from app.config import config

def validate_email(email:str) -> bool:
    return bool(re.match(config.EMAIL_REGEX, email))

def sanitize_input(text: str) -> str:
    text = re.sub(r'<script.*?>.*?</script>','', text, flags=re.DOTALL)
    return text.strip()
