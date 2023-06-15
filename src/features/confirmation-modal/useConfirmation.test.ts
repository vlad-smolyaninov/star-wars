import { renderHook, act } from '@testing-library/react';
import { useConfirmationModal } from './useConfirmationModal';

describe('useConfirmationModal', () => {
  test('should update state when createConfirmationModal is called', () => {
    const { result } = renderHook(() => useConfirmationModal());

    act(() => {
      result.current.createConfirmationModal({
        title: 'Test Title',
        text: 'Test Text',
      });
    });

    expect(result.current.state.isOpen).toBe(true);
    expect(result.current.state.title).toBe('Test Title');
    expect(result.current.state.text).toBe('Test Text');
  });

  test('should close the modal when closeModal is called', () => {
    const { result } = renderHook(() => useConfirmationModal());

    act(() => {
      result.current.createConfirmationModal({
        title: 'Test Title',
        text: 'Test Text',
      });
    });

    expect(result.current.state.isOpen).toBe(true);

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.state.isOpen).toBe(false);
    expect(result.current.state.title).toBe('');
    expect(result.current.state.text).toBe('');
  });
});
