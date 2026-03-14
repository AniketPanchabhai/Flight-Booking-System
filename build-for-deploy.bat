@echo off
echo 🚀 Building FlightBooker for deployment...

echo 📦 Installing backend dependencies...
cd backend
call npm install
cd ..

echo 🏗️ Building frontend...
cd frontend
call npm install
call npm run build
cd ..

echo ✅ Build complete! The frontend/dist folder is ready for deployment.
echo 📁 Upload the 'frontend/dist' folder to your hosting provider.
echo 📋 Check DEPLOYMENT_GUIDE.md for detailed instructions.

pause