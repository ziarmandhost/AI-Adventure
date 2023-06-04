window.addEventListener("load", () => {
  const submitButton = document.querySelector("#submit") as HTMLButtonElement

  submitButton.addEventListener("click", async () => {
    const username = (document.querySelector("#username") as HTMLInputElement).value ?? ""
    const email = (document.querySelector("#email") as HTMLInputElement).value ?? ""
    const password = (document.querySelector("#password") as HTMLInputElement).value ?? ""

    const res = await window.API.invoke("register", {username, email, password})

    if (res?.code !== 200) {
      alert(res?.message)
    }
    else {
      alert("Success! Be ready to login!")
      await window.API.send("change-screen", "login")
    }
  })
})
