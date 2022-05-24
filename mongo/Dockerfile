FROM mongo:5.0.7-focal

# Copy seed script to docker-entrypoint. This works because as per the MongoDB docs
# the docker container executes any JS scripts placed in this directory on container initialisation.
# https://github.com/docker-library/mongo/blob/9914fd4e7967c32ad79710b08e4a21f4f68239f9/3.4/docker-entrypoint.sh#L206
COPY seed-data.js /docker-entrypoint-initdb.d/