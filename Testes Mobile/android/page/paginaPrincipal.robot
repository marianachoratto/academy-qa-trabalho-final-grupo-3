*** Settings ***

Resource    ../../base.robot

*** Variables ***
${TITULO_HOME}    xpath=//android.view.View[@content-desc="Home"]
${MENU}           xpath=//android.widget.Button[@content-desc="Open navigation menu"]
${CARD_FILME}     xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[1]


# Botões do Menu

${BOTÃO_LOGIN}    xpath=//android.view.View[@content-desc="Login"]
${BOTAO_FILMES}    xpath=//android.view.View[@content-desc="Filmes"]
${BOTAO_REGISTRO}    xpath=//android.view.View[@content-desc="Registre-se"]
${BOTÃO_REGISTRAR}        xpath=//android.view.View[@content-desc="Registre-se"]

