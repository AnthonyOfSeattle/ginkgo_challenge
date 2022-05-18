docker compose -f docker-compose.prod.yml up -d --build
docker compose exec app python manage.py buildgenomebank
docker compose exec app python manage.py migrate --no-input
docker compose exec app python manage.py collectstatic --no-input
