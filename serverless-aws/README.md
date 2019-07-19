# How to deploy

```bash
# set up env varaibales
cp _env .env
vi .env
source .env

# node 10.13+ required
npm i -g serverless
npm i

export AWS_ACCESS_KEY_ID=AKIA2***************
export AWS_SECRET_ACCESS_KEY=4o7wV******************************
serverless deploy # or `sls deploy`
```
