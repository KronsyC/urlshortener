import os

os.system("del ./static/*&&rmdir backend/static")
os.system("cd ./frontend&&yarn build&&move ./build ../build&& cd .. && ren build static")