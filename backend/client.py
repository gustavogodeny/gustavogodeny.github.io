# TCP CLIENT CODE
import socket

def client_program():
    host = "192.168.5.91"  # as both code is running on same pc
    port = 8585  # socket server port number

    # On the machine which is running the TCP server, go to https://whatismyipaddress.com/ and get your public IP address
    # To debug the client, replace the IP address with "localhost"
    #host, port = "67.168.30.222", 8585

    client_socket = socket.socket()  # instantiate
    client_socket.connect((host, port))  # connect to the server

    message = input(" -> ")  # take input

    while message.lower().strip() != 'bye':
        client_socket.send(message.encode())  # send message
        data = client_socket.recv(1024).decode()  # receive response
        print('Received from server: ' + data)  # show response

        message = input(" -> ")  # again take input

    client_socket.close()  # close the connection

if __name__ == '__main__':
    client_program()
