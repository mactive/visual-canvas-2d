/**
 * https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
 * 灵感来源
 */
import React, { useEffect, useRef } from 'react';

const Canvas: React.FC = (props) => {
    const canvasRef = useRef(null)

    const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
        ctx.fill()
    }

    useEffect(() => {
        const canvas = canvasRef.current as unknown as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        let frameCount = 0
        let animationFrameID: number

        // our draw came here
        const render = () => {
            frameCount++
            draw(context!, frameCount)
            animationFrameID = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameID)
        }
    }, [draw]);

    
    return(
        <canvas 
            ref={canvasRef} 
            {...props}
        />
    );
}

export default Canvas