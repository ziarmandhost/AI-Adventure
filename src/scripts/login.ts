window.addEventListener("load", () => {
  const submitButton = document.querySelector("#submit") as HTMLButtonElement

  submitButton.addEventListener("click", async () => {
    const email = (document.querySelector("#email") as HTMLInputElement).value ?? ""
    const password = (document.querySelector("#password") as HTMLInputElement).value ?? ""

    const res = await window.API.invoke("login", {email, password})

    if (res?.code === 200 && res?.data?.token !== "") {
      localStorage.setItem("token", res?.data?.token)
      localStorage.setItem("isNewUser", res?.data?.isNewUser)
      localStorage.setItem("lastMessage", res?.data?.lastMessage)
      alert(`Welcome back, ${res?.data?.username}, to our game!`)
      window.API.send("change-screen", "game")
    }
    else {
      alert(res?.message)
      window.location.reload()
    }
  })
})
