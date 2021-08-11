export interface DragPosition {
    x: number;
    y: number;
}

export interface SubscribeDragParams {
    elem: HTMLElement;
    ondrag?: (delta: DragPosition, event: MouseEvent) => void;
    ondragstart?: (event: MouseEvent) => void;
    ondragend?: (event: MouseEvent) => void;
}

export const subscribeDrag = (params: SubscribeDragParams) => {
    const delta = { x: 0, y: 0 };
    const lastMousePos = { x: 0, y: 0 };

    const mousemove = (e: MouseEvent) => {
        delta.x = e.pageX - lastMousePos.x;
        delta.y = e.pageY - lastMousePos.y;

        params.ondrag?.(delta, e);

        lastMousePos.x = e.pageX;
        lastMousePos.y = e.pageY;
    };

    const mouseup = (e: MouseEvent) => {
        window.removeEventListener('mousemove', mousemove);
        window.removeEventListener('mouseup', mouseup);
        window.removeEventListener('mouseleave', mouseup);
        params.ondragend?.(e);
    };

    const mousedown = (e: MouseEvent) => {
        lastMousePos.x = e.pageX;
        lastMousePos.y = e.pageY;

        window.addEventListener('mousemove', mousemove);
        window.addEventListener('mouseup', mouseup);
        window.addEventListener('mouseleave', mouseup);
        params.ondragstart?.(e);
    };

    params.elem.addEventListener('mousedown', mousedown);

    return () => {
        params.elem.removeEventListener('mousedown', mousedown);
    };
};
