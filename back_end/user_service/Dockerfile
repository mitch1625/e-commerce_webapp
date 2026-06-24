FROM python:3.12
WORKDIR /back_end

COPY ./requirements.txt /back_end/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /back_end/requirements.txt

COPY ./user_service /back_end/user_service
COPY ./security /back_end/security

CMD ["sh", "-c", "uvicorn user_service.main:app --host 0.0.0.0 --port $PORT"]
