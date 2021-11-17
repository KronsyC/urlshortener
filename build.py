import os

os.system("del backend/static")
os.system("cd ./frontend&&yarn build&&move ./build ../backend/build && cd ../backend && ren build static")