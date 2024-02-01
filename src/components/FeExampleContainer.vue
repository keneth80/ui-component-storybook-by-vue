<template>
    <div class="container">
        <slot />
    </div>
</template>
<style lang="scss" scoped>
.container {
    min-width: 500px;
    min-height: 300px;
    display: flex;
    gap: 15px;
}
</style>
