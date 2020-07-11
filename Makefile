deploy-dev:
	yarn create_service dev
	sls deploy -s dev
deploy-staging:
	yarn create_service staging
	sls deploy -s staging
deploy-uat:
	yarn create_service uat
	sls deploy -s uat
