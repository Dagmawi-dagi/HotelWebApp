<template>
    <buttons-theme-toggle />
    <div class="dark:bg-gray-900 dark:text-white min-h-screen p-8">
        <h1>Welcome to the Home Page</h1>
        <p>This is the main content of the index page. asdasd</p>
        <h1 class="d"> Hello world!</h1>
            <ClientOnly>
                <Vueform>
                    <TextElement name="hello_world" label="Hello" placeholder="World" />
                </Vueform>
            </ClientOnly>
    </div>  
</template>

<style scoped >
</style>