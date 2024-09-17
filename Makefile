dev:
	docker-compose up

build:
	docker-compose build

c:
	docker compose run --rm app /bin/bash -c "cd server && bin/rails c"

migrate:
	docker compose run --rm app /bin/bash -c "cd server && bin/rails db:migrate"

migrate-redo:
	docker compose run --rm app /bin/bash -c "cd server && bin/rails db:migrate:redo"

rollback:
	docker compose run --rm app /bin/bash -c "cd server && bin/rails db:rollback"

seed:
	docker compose run --rm app /bin/bash -c "cd server && bin/rails db:seed"

codegen:
	/bin/bash -c "cd front && pnpm run codegen"

import-report_daily_line_code:
	docker compose run --rm app /bin/bash -c "cd server && bin/rails report_daily_line_code:import"

import-report_line_plans:
	docker compose run --rm app /bin/bash -c "cd server && bin/rails report_line_plans:import"

import-report_line_times:
	docker compose run --rm app /bin/bash -c "cd server && bin/rails report_line_times:import"

import-report_errors:
	docker compose run --rm app /bin/bash -c "cd server && bin/rails report_errors:import"

setup:
	docker compose run --rm app /bin/bash -c "cd server && bin/rails db:seed"
	docker compose run --rm app /bin/bash -c "cd server && bin/rails report_daily_line_code:import"
	docker compose run --rm app /bin/bash -c "cd server && bin/rails report_line_plans:import"
	docker compose run --rm app /bin/bash -c "cd server && bin/rails report_line_times:import"
	docker compose run --rm app /bin/bash -c "cd server && bin/rails report_errors:import"

deploy-production:
	docker compose run --rm app /bin/bash -c "cd server && bundle exec cap production deploy"
	docker compose run --rm front /bin/bash -c "cd front && bundle exec cap production deploy"
