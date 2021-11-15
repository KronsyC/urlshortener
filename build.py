import os

os.system("cd ./frontend&&yarn build&&move ./build ../backend/build && cd ../backend && ren build static")