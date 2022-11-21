<template>
    <component :is="tag" :style="{'font-size': font_size}">#Trendle</component>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent ({
    name: "BasicLogo",
    props: {
        tag: {
            type: String,
            default: 'h1'
        },
        font_size: {
            type: String,
            default: "20px"
        }
    }
});
</script>

