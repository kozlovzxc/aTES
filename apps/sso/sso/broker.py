import pika


class Broker:
    _declared_exchanges = []

    def __init__(self):
        self.connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
        self.channel = self.connection.channel()

    def publish_message(self, exchange, message):
        if exchange not in self._declared_exchanges:
            self.channel.exchange_declare(exchange, 'fanout')

        self.channel.basic_publish(exchange=exchange, routing_key='', body=str(message).encode())


broker = Broker()
