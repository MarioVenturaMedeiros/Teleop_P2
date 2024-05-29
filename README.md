# Turtlebot teleoperado - parte 2

Neste projeto foi feito uma interface para controle de um robô turtlebot3 burger. Além disso, pela interface o usuário consegue ver imagens transmitidas por uma câmera acoplada ao robô. Caso queira ver uma demostração,  [Clique aqui](A_DEFINIR). Note que esse projeto tem a origem [nesse repositório](https://github.com/Inteli-College/2024-1B-T08-EC06-G05). A única coisa que o autor Mário Ventura Medeiros não tem autoria que está presente nesse repositório é o CSS dos componentes, autoria de [Gustavo Machado](https://github.com/gustavoesteves0).

# Mudanças da parte 1 para a parte 2

Para ver o repositório da parte 1, [clique aqui](https://github.com/MarioVenturaMedeiros/Ponderadas_M6). Visto que o frontend foi construído em react, houve a necessidade de alterar o script de movimentação para um componente react. Assim foi criado o componente rosbridge_movement. Esse script é responsável por fazer a comunicação do robô pelo frontend por meio do ROSBridge (uma ferramenta que permite a comunicação entre sistemas ROS (Robot Operating System) e aplicações externas via WebSockets, facilitando a integração de robôs com web serviços e outras tecnologias), assim enviando as informações publicadas no tópico /cmd_vel, tópico ROS responsável pela movimentação do turtlebot3 burger. Note que o script de movimentação feito em Python continua presente no projeto, com o intuito de ser utilizado em última instância caso algum problema tenha ocorrido com a aplicação WEB.

# Como rodar o projeto

## Pré-requisitos

- ROS2 instalado no sistema operacional (Linux Ubuntu) da Raspberry do Turtlebot 3 e do computador usado para operá-lo remotamente

- [Pacote ROS do Turtlebot 3](https://github.com/ROBOTIS-GIT/turtlebot3/tree/master) instalado no sistema operacional (Linux Ubuntu) da Raspberry do Turtlebot 3 e do computador usado para operá-lo remotamente

- Raspberry do Turtlebot 3 e computador usado para operá-lo remotamente conectados na mesma rede wi-fi

- Git instalado no computador usado para operar o robô remotamente

- Pacote ROSBridge do Turtlebot 3 instalado no sistema operacional (Linux Ubuntu) da Raspberry do Turtlebot 3 e do computador usado para operá-lo remotamente

- Node.js atualizado no sistema operacional (Linux Ubuntu) da Raspberry do Turtlebot 3

## Comunicação via SSH


### Passo a passo

1. No sistema operacional da Raspberry contida no Turtlebot 3 a ser controlado, abra uma janela de terminal e digite os seguintes comandos para encontrar o IP do Turtlebot 3 dado pela rede:

```bash
    ip addr
```

Copie o número registrado em Wlan que vem antes da "/" (exemplo: 10.128.0.30). Esse será o IP que será utilizado para comunicação do robô para a aplicação WEB.

2. Na mesma janela de terminal, digite os seguintes comandos para instalar o pacote responsável por iniciar um servidor SSH e executá-lo.


```bash
    sudo apt install openssh-server
    sudo systemctl enable ssh
    sudo ufw allow ssh
    sudo systemctl start ssh
```

3. No sistema operacional do computador que será utilizado para controlar o robô de maneira remota, abra uma janela de terminal e digite o seguinte comando:

```bash
    ssh user@server
```

No comando acima, `user` é o nome de usuário do sistema operacional da Raspberry do Turtlebot 3 e `server` é o ip copiado do passo 1. Caso você esteja usando o Turtlebot 3 do grupo 5, o comando a ser digitado nessa etapa será `ssh sugarz3ro@IpCopiado` .

4. Digite a senha de usuário que será solicitada pelo terminal.

5. Com o ssh conectado, digite os seguintes comandos para limitar a comunicação via ROS a um domínio com ID 5 dentro da rede:

```bash
    echo 'export ROS_DOMAIN_ID=5' >> ~/.bashrc
    source ~/.bashrc
```

6. Com o ssh conectado, clone o repositório do projeto no diretório de sua preferência através dos comandos:

```bash
    git clone https://github.com/Inteli-College/2024-1B-T08-EC06-G05.git
```

7. Na mesma janela de terminal, altere o IP em dois scripts: `rosbridge_movement.jsx` e `camera.jsx` Com os comandos abaixo:

```bash
    cd 2024-1B-T08-EC06-G05/src/frontend/src/components/camera
    nvim camera.jsx
    cd ..
    cd rosbridge_movement/
    nvim rosbridge_movement/
```

Para mudar o IP, após realizar o comando nvim nos dois casos terá uma parte do script como mostrado abaixo. Basta mudar o número contido no url para o IP copiado no passo 1.

```bash
    ros.current = new ROSLIB.Ros({
      url: 'ws://10.128.0.30:9090'
    });
```

8. Na mesma janela do terminal, digite o seguinte comando para iniciar a comunicação entre a Raspberry e o microcontrolador do robô, bem como torná-lo apto a receber comandos de movimentação remotamente:

```bash
    ros2 launch turtlebot3_bringup robot.launch.py
```

9. Em outra janela de terminal, ainda conectado no ssh, digite o seguinte comando para iniciar o ROSBridge para estabelecer a comunicação entre o robô e a aplicação WEB:

```bash
    ros2 launch rosbridge_server rosbridge_websocket_launch.xml
```

10. Em outra janela de terminal, ainda conectado no ssh, digite os seguintes comandos partindo da raiz do projeto para transmitir as informações da câmera:

```bash
    cd src/workspace/src/SugarZ3ro_pkg/SugarZ3ro_pkg/
    python3 sender.py
```

11. Em outra janela de terminal, desconectado do ssh, digite os seguintes comandos a partir da raiz do projeto para ir até a pasta do frontend e iniciar a aplicação WEB, que já contará com a movimentação do robô e o sistema de segurança integrados:

```bash
    cd 2024-1B-T08-EC06-G05/src/frontend
    npm run dev
```

