import { useCallback } from 'react';
import { useReactFlow, Node } from '@xyflow/react';
import { createAnnotation } from '@components/ui/create-annotation';

export const useAnnotations = () => {
  const { getNode, addNodes, setNodes } = useReactFlow();

  const addAnnotation = useCallback(
    (nodeId: string, config: {
      label: string;
      offsetX?: number;
      offsetY?: number;
      level?: 1 | 2 | 3 | 4;
      arrow?: string;
      arrowStyle?: React.CSSProperties;
    }) => {
      const node = getNode(nodeId);
      if (!node) return;

      const offsetX = config.offsetX ?? -150;
      const offsetY = config.offsetY ?? -50;

      const annotation = createAnnotation({
        nodeId,
        label: config.label,
        position: {
          x: node.position.x + offsetX,
          y: node.position.y + offsetY,
        },
        level: config.level,
        arrow: config.arrow,
        arrowStyle: config.arrowStyle,
      });

      addNodes(annotation);
    },
    [getNode, addNodes]
  );

  const removeAnnotations = useCallback(
    (nodeId: string) => {
      setNodes((nodes) =>
        nodes.filter(
          (node) => !(node.parentId === nodeId && node.type === 'annotationNode')
        )
      );
    },
    [setNodes]
  );

  const getNodeAnnotations = useCallback(
    (nodeId: string): Node[] => {
      return (
        getNode(nodeId)?.parentId === nodeId &&
          getNode(nodeId)?.type === 'annotationNode'
          ? [getNode(nodeId)]
          : []
      ) as Node[];
    },
    [getNode]
  );

  return {
    addAnnotation,
    removeAnnotations,
    getNodeAnnotations,
  };
};
