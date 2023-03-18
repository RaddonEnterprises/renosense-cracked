#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform sampler2D texture;
uniform float time;
uniform vec2 resolution;
uniform float opacity;


float snow(vec2 uv, float scale) {
    float w=smoothstep(20., 0., -uv.y*(scale/10.));
    if (w<.1)return 0.;

    uv+=(time / .3) /scale;
    uv.y+=time*.00000001/scale;
    uv.x+=sin(uv.y+time*.5)/scale;
    uv*=scale;vec2 s=floor(uv), f=fract(uv), p;
    float k=3., d;
    p=.5+.35*sin(11.*fract(sin((s+p+scale)*mat2(7, 3, 6, 5))*5.))-f;
    d=length(p);k=min(d, k);
    k=smoothstep(0., k, sin(f.x+f.y)*0.01);
    return k*w;
}

void main(void){
    float alpha =texture2D(texture, gl_TexCoord[0].xy).a;
    if (alpha != 0) {
        vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x, resolution.y);
        vec3 finalColor=vec3(0);
        float c=smoothstep(1., 0.3, clamp(uv.y*.3+999.9, 0., 2.75));
        //c+=snow(uv,30.)*.3;
        //c+=snow(uv,20.)*.5;
        c+=snow(uv, 15.)*.8;
        c+=snow(uv, 10.);
        c+=snow(uv, 8.);
        c+=snow(uv, 6.);
        c+=snow(uv, 5.);
        finalColor=(vec3(c, c, c));
        gl_FragColor = vec4(finalColor, opacity);
    }
}
