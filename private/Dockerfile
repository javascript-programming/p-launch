FROM ubuntu:16.04

RUN useradd -m launch && \
    echo "launch ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

COPY jaavethereum.json /home/launch
COPY run_geth_node.sh /home/launch
COPY keystore /home/launch/keystore

RUN chown -R launch:launch /home/launch

RUN apt-get update && \
    apt-get install -y software-properties-common

RUN add-apt-repository -y ppa:ethereum/ethereum && \
    apt-get update && \
    apt-get install -y ethereum

USER launch

WORKDIR /home/launch

EXPOSE 30303
EXPOSE 8545
EXPOSE 8546

RUN geth --cache 512 --datadir . init ./jaavethereum.json

RUN chmod +x ./run_geth_node.sh

ENTRYPOINT ["/home/launch/run_geth_node.sh"]


