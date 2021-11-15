import os

os.system("del ./frontend/static")
os.system("cd ./frontend&&yarn build&&move ./build ../backend/build && cd ../backend && ren build static")