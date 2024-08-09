<template> 
    <div class="snake">
        <Transition name="dialog_anim">
        <div class="dialog" v-if="!isStart">
            <div class="dialog__content" v-if="!isStart">
                <div>
                    <label for="speed">Скорость змеи:{{ speed }}</label>
                    <br>
                    <div>
                        <n-slider id="speed" v-model:value="speed" :step="5" :min="5" :max="10"/>
                    </div>
                </div>
                <div>
                    <label for="size">Размер арены:{{ areaSize }}</label>
                    <br>
                    <n-slider id="size" v-model:value="areaSize" :step="2" :min="6" :max="12"/>
                </div>
                <button class="dialog__button" @click="Start">
                    Начать
                </button>
            </div>
        </div>
    </Transition>
   

    
    <div class="interface">
        <div class="score">Счет: {{ CalculateScore }}</div>
        <n-button @click="Restart" strong secondary round type="primary">restart</n-button>
        <div class="record">Рекорд: {{ CalculateRecord }}</div>
    </div>


    <div class="area">
        <Transition name="lose">
            <div class="text_lose" v-if="reset" style="color: white">Ты проиграл</div>
        </Transition>  
        <canvas width="0" height="0" id="ctx" ref="area" :class="{resetCtx: reset}"></canvas>
    </div>
    <div class="buttons" @click="Controller">
        <button id="up"  class="control">вверх</button>
            <div class="horizontal">
                <button id="left" class="control">влево</button>
                <button id="right" class="control">вправо</button>
            </div>
        <button id="down" class="control">вниз</button>

    </div>
</div>
    
   
</template>

<script>
    import InitGame from '@/scripts/snake'
    export default{
        data(){
            return{
                isStart: false,
                areaSize: 8,
                speed: 5,
                record: 0,
                foodInterval: '',
                snakeInterval: '',
                newGame: '',
                dir: '',
                reset: false,
                score: 0
            }
        },
        mounted(){
            window.addEventListener('keyup', this.Controller);
        },
        computed:{
                CalculateScore(){
                    this.score = this.newGame.count;
                    return this.score;
                    
                },
                CalculateRecord(){
                    if(this.score > this.record){
                        this.record = this.score;
                    }
                    return this.record;
                }
            },
        methods:{
            SetStep(){
                if(window.innerWidth < 450){
    
                    return 32;
                }
                else{

                    return 50;
                }
            },
  
            Start(){
                this.isStart = !this.isStart;
                this.apples = [];
                this.newGame = new InitGame(this.$refs.area, this.areaSize, this.SetStep());
                if(this.isStart){
                    this.newGame.CreateArea();
                    this.newGame.CreateFood();
                    this.newGame.InitSnake();
                    this.interval = setInterval(() => {
                        this.newGame.CreateFood();
                }, 3000)
                }
                
            },
            Restart(){
                this.isStart = !this.isStart;
                clearInterval(this.snakeInterval)
                this.reset = false;
            },


            Controller(el){
                    if(el.key == 'ArrowUp' || el.target.id == 'up'){
                        this.dir = 'up'        
                    }        
                    if(el.key == 'ArrowDown' || el.target.id == 'down'){
                        this.dir = 'down'    
                    }  
                    if(el.key == 'ArrowLeft' || el.target.id == 'left'){
                        this.dir = 'left' 
                    }  
                    if(el.key == 'ArrowRight' || el.target.id == 'right'){
                        this.dir = 'right' 
                    }  
                    clearInterval(this.snakeInterval)
                        this.snakeInterval = setInterval(() => {
                            this.newGame.SnakeMove(this.dir)
                            this.newGame.InitSnake();
                            if(this.newGame.ResetGame()){
                                clearInterval(this.interval)
                                clearInterval(this.snakeInterval);
                                this.reset = true;

                            }
                        }, 150)
                }
            },

        }
    
        
</script>

<style scoped lang="scss">
.n-slider{
    width: 120px;
}
.snake{
    width: 100%;
    position: relative;
    min-height: auto;
    height: calc(100% - 42px);
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: rgb(25, 25, 80);
}
.buttons{
    display: none;
    @media(max-width: 450px){
        display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    .horizontal{
        display: flex;
        flex-direction: row;
        gap: 10px;
    }
    .control{
        width: 60px;
        height: 50px;
        }
    }
   
}

.resetCtx{
    filter: blur(5px);
    transition: filter 2s linear;
}
#ctx{
    background-color: rgba(138, 138, 138, 0.596);
    border-radius: 5px;
    padding: 5px;
}
.text_lose{
    width: 100%;
    text-align: center;
    z-index: 2;
    color: white;
    font-size: 36px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.area{
    position: relative;
}

.lose-enter-active,
.lose-leave-active {
  transition: opacity 0.5s ease;
}
.lose-enter-from,
.lose-leave-to {
  opacity: 0;
}

.dialog_anim-leave-active {
  transition: all 1s ease;
}
.dialog_anim-leave-to {
    opacity: 0;
}
.dialog{
    width: 100%;
    height: 100vh;
    top: -42px;
    position: absolute;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    animation: gameSettingsAnim1 0.5s ease;
    &__content{
        max-width: 400px;
        width: 70%;
        max-height: 300px;
        height: 200px;
        background-color:  rgb(53, 53, 167);
        animation: gameSettingsAnim2 1s ease;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        border-radius: 15px;
        color: white
    }
    &__button{

    }
}
    @keyframes gameSettingsAnim1 {
        from{
            opacity: 0;
        }
        to{
            opacity: 1;
        }
    }
    @keyframes gameSettingsAnim2 {
        from{
            opacity: 0;
            transform: scale(0.5) rotate(360deg);
        }
        to{
            opacity: 1;
            transform: scale(1) rotate(0deg);
        }
    }
    .interface{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding: 10px;
    }
    .score{
        color: white;
    }
    .record{
        color: white;
    }

</style>
