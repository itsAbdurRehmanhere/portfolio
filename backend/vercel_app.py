import sys
import os

# Add the 'backend' directory to the Python path so Vercel can find the 'app' module
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.main import app

# This is the entry point for Vercel serverless functions
# Vercel expects a variable named 'app'